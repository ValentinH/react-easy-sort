import { Point } from './types'

/**
 * This function check if a given point is inside of the items rect.
 * If it's not inside any rect, it will return the index of the closest rect
 */
export const findItemIndexAtPosition = (
  { x, y }: Point,
  itemsRect: DOMRect[],
  { fallbackToClosest = false } = {}
): number => {
  let smallestDistance = 10000
  let smallestDistanceIndex = -1
  for (let index = 0; index < itemsRect.length; index += 1) {
    const rect = itemsRect[index]
    // if it's inside the rect, we return the current index directly
    if (x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom) {
      return index
    }
    if (fallbackToClosest) {
      // otherwise we compute the distance and update the smallest distance index if needed
      const itemCenterX = (rect.left + rect.right) / 2
      const itemCenterY = (rect.top + rect.bottom) / 2

      const distance = Math.sqrt(Math.pow(x - itemCenterX, 2) + Math.pow(y - itemCenterY, 2)) // ** 2 operator is not supported on IE11
      if (distance < smallestDistance) {
        smallestDistance = distance
        smallestDistanceIndex = index
      }
    }
  }
  return smallestDistanceIndex
}

/**
 * Finds the first scrollable parent of an element.
 * @param {HTMLElement} element The element to start searching from.
 * @returns {HTMLElement | Window} The scrollable parent or the window.
 */
export const getScrollableParent = (element: HTMLElement | null): HTMLElement | Window => {
  if (!element) {
    return window
  }

  let current: HTMLElement | null = element

  while (current) {
    const { overflowX, overflowY } = window.getComputedStyle(current)

    // check if the element is horizontally scrollable
    const isHorizontallyScrollable =
      (overflowX === 'auto' || overflowX === 'scroll') &&
      current.scrollWidth > current.clientWidth

    // check if the element is vertically scrollable
    const isVerticallyScrollable =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      current.scrollHeight > current.clientHeight

    // if it's scrollable in either direction it's a match
    if (isHorizontallyScrollable || isVerticallyScrollable) {
      return current
    }

    current = current.parentElement
  }

  return window
}
