import React from 'react'

import { Point } from './types'

const getMousePoint = (e: MouseEvent | React.MouseEvent): Point => ({
  x: Number(e.clientX),
  y: Number(e.clientY),
})

const getTouchPoint = (touch: Touch | React.Touch): Point => ({
  x: Number(touch.clientX),
  y: Number(touch.clientY),
})

const getPointInContainer = (point: Point, containerTopLeft: Point): Point => {
  return {
    x: point.x - containerTopLeft.x,
    y: point.y - containerTopLeft.y,
  }
}

const preventDefault = (event: Event) => {
  event.preventDefault()
}

const disableContextMenu = () => {
  window.addEventListener('contextmenu', preventDefault, { capture: true, passive: false })
}

const enableContextMenu = () => {
  window.removeEventListener('contextmenu', preventDefault)
}

export type OnStartArgs = { point: Point; pointInWindow: Point }
export type OnMoveArgs = { point: Point; pointInWindow: Point }

type UseDragProps = {
  onStart?: (args: OnStartArgs) => void
  onMove?: (args: OnMoveArgs) => void
  onEnd?: () => void
  containerRef: React.MutableRefObject<HTMLDivElement | null>
  knobs?: HTMLElement[],
}

export const useDrag = ({ onStart, onMove, onEnd, containerRef, knobs }: UseDragProps) => {
  // contains the top-left coordinates of the container in the window. Set on drag start and used in drag move
  const containerPositionRef = React.useRef<Point>({ x: 0, y: 0 })
  // on touch devices, we only start the drag gesture after pressing the item 200ms.
  // this ref contains the timer id to be able to cancel it
  const handleTouchStartTimerRef = React.useRef<number | undefined>(undefined)
  // on non-touch device, we don't call onStart on mouse down but on the first mouse move
  // we do this to let the user clicks on clickable element inside the container
  // this means that the drag gesture actually starts on the fist move
  const isFirstMoveRef = React.useRef(false)
  // see https://twitter.com/ValentinHervieu/status/1324407814970920968
  // we do this so that the parent doesn't have to use `useCallback()` for these callbacks
  const callbacksRef = React.useRef({ onStart, onMove, onEnd })

  // instead of relying on hacks to know if the device is a touch device or not,
  // we track this using an onTouchStart listener on the document. (see https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685)
  const [isTouchDevice, setTouchDevice] = React.useState(false)

  React.useEffect(() => {
    callbacksRef.current = { onStart, onMove, onEnd }
  }, [onStart, onMove, onEnd])

  const cancelTouchStart = () => {
    if (handleTouchStartTimerRef.current) {
      window.clearTimeout(handleTouchStartTimerRef.current)
    }
  }

  const saveContainerPosition = React.useCallback(() => {
    if (containerRef.current) {
      const bounds = containerRef.current.getBoundingClientRect()
      containerPositionRef.current = { x: bounds.left, y: bounds.top }
    }
  }, [containerRef])

  const onDrag = React.useCallback((pointInWindow: Point) => {
    const point = getPointInContainer(pointInWindow, containerPositionRef.current)
    if (callbacksRef.current.onMove) {
      callbacksRef.current.onMove({ pointInWindow, point })
    }
  }, [])

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      // if this is the first move, we trigger the onStart logic
      if (isFirstMoveRef.current) {
        isFirstMoveRef.current = false
        const pointInWindow = getMousePoint(e)
        const point = getPointInContainer(pointInWindow, containerPositionRef.current)
        if (callbacksRef.current.onStart) {
          callbacksRef.current.onStart({ point, pointInWindow })
        }
      }
      // otherwise, we do the normal move logic
      else {
        onDrag(getMousePoint(e))
      }
    },
    [onDrag]
  )

  const onTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (e.cancelable) {
        // Prevent the whole page from scrolling
        e.preventDefault()
        onDrag(getTouchPoint(e.touches[0]))
      } else {
        // if the event is not cancelable, it means the browser is currently scrolling
        // which cannot be interrupted. Thus we cancel the drag gesture.
        document.removeEventListener('touchmove', onTouchMove)
        if (callbacksRef.current.onEnd) {
          callbacksRef.current.onEnd()
        }
      }
    },
    [onDrag]
  )

  const onMouseUp = React.useCallback(() => {
    isFirstMoveRef.current = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    if (callbacksRef.current.onEnd) {
      callbacksRef.current.onEnd()
    }
  }, [onMouseMove])

  const onTouchEnd = React.useCallback(() => {
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
    enableContextMenu()
    if (callbacksRef.current.onEnd) {
      callbacksRef.current.onEnd()
    }
  }, [onTouchMove])

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.button !== 0) {
        // we don't want to handle clicks other than left ones
        return
      }

      if (knobs.length && !knobs.find(knob => knob.contains(e.target))) {
        return;
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      saveContainerPosition()

      // mark the next move as being the first one
      isFirstMoveRef.current = true
    },
    [onMouseMove, onMouseUp, saveContainerPosition, knobs]
  )

  const handleTouchStart = React.useCallback(
    (point: Point, pointInWindow: Point) => {
      document.addEventListener('touchmove', onTouchMove, { capture: false, passive: false })
      document.addEventListener('touchend', onTouchEnd)
      disableContextMenu()

      if (callbacksRef.current.onStart) {
        callbacksRef.current.onStart({ point, pointInWindow })
      }
    },
    [onTouchEnd, onTouchMove]
  )

  const onTouchStart = React.useCallback(
    (e: TouchEvent) => {
      saveContainerPosition()

      const pointInWindow = getTouchPoint(e.touches[0])
      const point = getPointInContainer(pointInWindow, containerPositionRef.current)

      // we wait 120ms to start the gesture to be sure that the user
      // is not trying to scroll the page
      handleTouchStartTimerRef.current = window.setTimeout(
        () => handleTouchStart(point, pointInWindow),
        120
      )
    },
    [handleTouchStart, saveContainerPosition]
  )

  const detectTouchDevice = React.useCallback(() => {
    setTouchDevice(true)
    document.removeEventListener('touchstart', detectTouchDevice)
  }, [])

  // if the user is scrolling on mobile, we cancel the drag gesture
  const touchScrollListener = React.useCallback(() => {
    cancelTouchStart()
  }, [])

  React.useLayoutEffect(() => {
    if (isTouchDevice) {
      const container = containerRef.current
      container?.addEventListener('touchstart', onTouchStart, { capture: true, passive: false })
      // we are adding this touchmove listener to cancel drag if user is scrolling
      // however, it's also important to have a touchmove listener always set
      // with non-capture and non-passive option to prevent an issue on Safari
      // with e.preventDefault (https://github.com/atlassian/react-beautiful-dnd/issues/1374)
      document.addEventListener('touchmove', touchScrollListener, {
        capture: false,
        passive: false,
      })
      document.addEventListener('touchend', touchScrollListener, {
        capture: false,
        passive: false,
      })

      return () => {
        container?.removeEventListener('touchstart', onTouchStart)
        document.removeEventListener('touchmove', touchScrollListener)
        document.removeEventListener('touchend', touchScrollListener)
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
        enableContextMenu()
        cancelTouchStart()
      }
    }
    // if non-touch device
    document.addEventListener('touchstart', detectTouchDevice)
    return () => {
      document.removeEventListener('touchstart', detectTouchDevice)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [
    isTouchDevice,
    detectTouchDevice,
    onMouseMove,
    onTouchMove,
    touchScrollListener,
    onTouchEnd,
    onMouseUp,
    containerRef,
    onTouchStart,
  ])

  // on touch devices, we cannot attach the onTouchStart directly via React:
  // Touch handlers must be added with {passive: false} to be cancelable.
  // https://developers.google.com/web/updates/2017/01/scrolling-intervention
  return isTouchDevice ? {} : { onMouseDown }
}
