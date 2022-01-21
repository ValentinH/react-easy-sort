import arrayMove from 'array-move'
import React, { HTMLAttributes } from 'react'

import { findItemIndexAtPosition } from './helpers'
import { useDrag } from './hooks'
import { Point } from './types'

const DEFAULT_CONTAINER_TAG = 'div'

type Props<TTag extends keyof JSX.IntrinsicElements> = HTMLAttributes<TTag> & {
  children: React.ReactNode
  /** Determines whether drag functionality is enabled, defaults to true */
  allowDrag?: boolean
  /** Called when the user finishes a sorting gesture. */
  onSortEnd: (oldIndex: number, newIndex: number) => void
  /** Class applied to the item being dragged */
  draggedItemClassName?: string
  /** Determines which type of html tag will be used for a container element */
  as?: TTag
}

// this context is only used so that SortableItems can register/remove themselves
// from the items list
type Context = {
  registerItem: (item: HTMLElement) => void
  removeItem: (item: HTMLElement) => void
  registerKnob:  (item: HTMLElement) => void
  removeKnob:  (item: HTMLElement) => void
}

const SortableListContext = React.createContext<Context | undefined>(undefined)
const SortableList = <TTag extends keyof JSX.IntrinsicElements = typeof DEFAULT_CONTAINER_TAG>({ children, allowDrag = true, onSortEnd, draggedItemClassName, as, ...rest }: Props<TTag>) => {
  // this array contains the elements than can be sorted (wrapped inside SortableItem)
  const itemsRef = React.useRef<HTMLElement[]>([])
  // this array contains the coordinates of each sortable element (only computed on dragStart and used in dragMove for perf reason)
  const itemsRect = React.useRef<DOMRect[]>([])
  // Hold all registered knobs
  const knobs = React.useRef<HTMLElement[]>([]);
  // contains the container element
  const containerRef = React.useRef<HTMLElement | null>(null)
  // contains the target element (copy of the source element)
  const targetRef = React.useRef<HTMLElement | null>(null)
  // contains the index in the itemsRef array of the element being dragged
  const sourceIndexRef = React.useRef<number | undefined>(undefined)
  // contains the index in the itemsRef of the element to be exchanged with the source item
  const lastTargetIndexRef = React.useRef<number | undefined>(undefined)
  // contains the offset point where the initial drag occurred to be used when dragging the item
  const offsetPointRef = React.useRef<Point>({ x: 0, y: 0 })

  React.useEffect(() => {
    return () => {
      // cleanup the target element from the DOM when SortableList in unmounted
      if (targetRef.current) {
        document.body.removeChild(targetRef.current)
      }
    }
  }, [])

  const updateTargetPosition = (position: Point) => {
    if (targetRef.current) {
      const offset = offsetPointRef.current

      // we use `translate3d` to force using the GPU if available
      targetRef.current.style.transform = `translate3d(${position.x - offset.x}px, ${
        position.y - offset.y
      }px, 0px)`
    }
  }

  const copyItem = React.useCallback(
    (sourceIndex: number) => {
      if (!containerRef.current) {
        return
      }

      const source = itemsRef.current[sourceIndex]
      const sourceRect = itemsRect.current[sourceIndex]

      const copy = source.cloneNode(true) as HTMLElement

      // added the "dragged" class name
      if (draggedItemClassName) {
        draggedItemClassName.split(' ').forEach((c) => copy.classList.add(c))
      }

      // we ensure the copy has the same size than the source element
      copy.style.width = `${sourceRect.width}px`
      copy.style.height = `${sourceRect.height}px`
      // we place the target starting position to the top left of the window
      // it will then be moved relatively using `transform: translate3d()`
      copy.style.position = 'fixed'
      copy.style.margin = '0'
      copy.style.top = '0'
      copy.style.left = '0'

      const sourceCanvases = source.querySelectorAll('canvas');
      copy.querySelectorAll('canvas').forEach((canvas, index) => {
        canvas.getContext('2d')?.drawImage(sourceCanvases[index], 0, 0);
      });

      document.body.appendChild(copy)

      targetRef.current = copy
    },
    [draggedItemClassName]
  )

  const listeners = useDrag({
    containerRef,
    knobs: knobs.current,
    onStart: ({ pointInWindow }) => {
      if (!containerRef.current) {
        return
      }

      itemsRect.current = itemsRef.current.map((item) => item.getBoundingClientRect())

      const sourceIndex = findItemIndexAtPosition(pointInWindow, itemsRect.current)
      // if we are not starting the drag gesture on a SortableItem, we exit early
      if (sourceIndex === -1) {
        return
      }

      // saving the index of the item being dragged
      sourceIndexRef.current = sourceIndex

      // the item being dragged is copied to the document body and will be used as the target
      copyItem(sourceIndex)

      // hide source during the drag gesture
      const source = itemsRef.current[sourceIndex]
      source.style.opacity = '0'
      source.style.visibility = 'hidden'

      // get the offset between the source item's window position relative to the point in window
      const sourceRect = source.getBoundingClientRect()
      offsetPointRef.current = {
        x: pointInWindow.x - sourceRect.left,
        y: pointInWindow.y - sourceRect.top,
      }

      updateTargetPosition(pointInWindow)

      // Adds a nice little physical feedback
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100)
      }
    },
    onMove: ({ pointInWindow }) => {
      updateTargetPosition(pointInWindow)

      const sourceIndex = sourceIndexRef.current
      // if there is no source, we exit early (happened when drag gesture was started outside a SortableItem)
      if (sourceIndex === undefined) {
        return
      }

      const targetIndex = findItemIndexAtPosition(pointInWindow, itemsRect.current, {
        fallbackToClosest: true,
      })
      // if not target detected, we don't need to update other items' position
      if (targetIndex === -1) {
        return
      }
      // we keep track of the last target index (to be passed to the onSortEnd callback)
      lastTargetIndexRef.current = targetIndex

      const isMovingRight = sourceIndex < targetIndex
      const draggedItemRects = itemsRect.current[sourceIndex]
      const nextItemRects = itemsRect.current[isMovingRight ? sourceIndex + 1 : sourceIndex - 1]

      if (nextItemRects === undefined) {
        return
      }

      const spacingY = isMovingRight
        ? (nextItemRects?.top ?? 0) - draggedItemRects.bottom
        : draggedItemRects.top - (nextItemRects?.bottom ?? 0)

      const spacingX = isMovingRight
        ? (nextItemRects?.left ?? 0) - draggedItemRects.right
        : draggedItemRects.left - (nextItemRects?.right ?? 0)

      const translateX = (isMovingRight ? -1 : 1) * (draggedItemRects.width + spacingX)
      const translateY = (isMovingRight ? -1 : 1) * (draggedItemRects.height + spacingY)

      // in this loop, we go over each sortable item and see if we need to update their position
      for (let index = 0; index < itemsRef.current.length; index += 1) {
        const currentItem = itemsRef.current[index]
        // if current index is between sourceIndex and targetIndex, we need to translate them
        if (
          (isMovingRight && index >= sourceIndex && index <= targetIndex) ||
          (!isMovingRight && index >= targetIndex && index <= sourceIndex)
        ) {
          // we use `translate3d` to force using the GPU if available
          currentItem.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`
        }
        // otherwise, the item should be at its original position
        else {
          currentItem.style.transform = 'translate3d(0,0,0)'
        }
        // we want the translation to be animated
        currentItem.style.transitionDuration = '300ms'
      }
    },
    onEnd: () => {
      // we reset all items translations (the parent is expected to sort the items in the onSortEnd callback)
      for (let index = 0; index < itemsRef.current.length; index += 1) {
        const currentItem = itemsRef.current[index]
        currentItem.style.transform = ''
        currentItem.style.transitionDuration = ''
      }

      const sourceIndex = sourceIndexRef.current
      if (sourceIndex !== undefined) {
        // show the source item again
        const source = itemsRef.current[sourceIndex]
        if (source) {
          source.style.opacity = '1'
          source.style.visibility = ''
        }

        const targetIndex = lastTargetIndexRef.current
        if (targetIndex !== undefined) {
          if (sourceIndex !== targetIndex) {
            // sort our internal items array
            itemsRef.current = arrayMove(itemsRef.current, sourceIndex, targetIndex)
            // let the parent know
            onSortEnd(sourceIndex, targetIndex)
          }
        }
      }
      sourceIndexRef.current = undefined
      lastTargetIndexRef.current = undefined

      // cleanup the target element from the DOM
      if (targetRef.current) {
        document.body.removeChild(targetRef.current)
        targetRef.current = null
      }
    },
  })

  const registerItem = React.useCallback((item: HTMLElement) => {
    itemsRef.current.push(item)
  }, [])

  const removeItem = React.useCallback((item: HTMLElement) => {
    const index = itemsRef.current.indexOf(item)
    if (index !== -1) {
      itemsRef.current.splice(index, 1)
    }
  }, [])

  const registerKnob = React.useCallback((item: HTMLElement) => {
    knobs.current.push(item)
  }, [])

  const removeKnob = React.useCallback((item: HTMLElement) => {
    const index = knobs.current.indexOf(item)

    if (index !== -1) {
      knobs.current.splice(index, 1)
    }
  }, [])

  // we need to memoize the context to avoid re-rendering every children of the context provider
  // when not needed
  const context = React.useMemo(() => ({ registerItem, removeItem, registerKnob, removeKnob }), [registerItem, removeItem, registerKnob, removeKnob])

  return React.createElement(
    as || DEFAULT_CONTAINER_TAG, 
    { 
      ...(allowDrag ? listeners : {}),
      ...rest, 
      ref: containerRef
    },
    <SortableListContext.Provider value={context}>{children}</SortableListContext.Provider>
  ) 
}

export default SortableList

type ItemProps = {
  children: React.ReactElement
}

/**
 * SortableItem only adds a ref to its children so that we can register it to the main Sortable
 */
export const SortableItem = ({ children }: ItemProps) => {
  const context = React.useContext(SortableListContext)
  if (!context) {
    throw new Error('SortableItem must be a child of SortableList')
  }
  const { registerItem, removeItem } = context
  const elementRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    const currentItem = elementRef.current
    if (currentItem) {
      registerItem(currentItem)
    }

    return () => {
      if (currentItem) {
        removeItem(currentItem)
      }
    }
    // if the children changes, we want to re-register the DOM node
  }, [registerItem, removeItem, children])

  return React.cloneElement(children, { ref: elementRef })
}

export const SortableKnob = ({ children  }: ItemProps) => {
  const context = React.useContext(SortableListContext)

  if (!context) {
    throw new Error('SortableKnob must be a child of SortableList')
  }

  const { registerKnob, removeKnob } = context;

  const elementRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    const currentItem = elementRef.current

    if (currentItem) {
      registerKnob(currentItem)
    }

    return () => {
      if (currentItem) {
        removeKnob(currentItem)
      }
    }
    // if the children changes, we want to re-register the DOM node
  }, [registerKnob, removeKnob, children])

  return React.cloneElement(children, { ref: elementRef })
};
