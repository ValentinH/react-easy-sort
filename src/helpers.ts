import { Point } from './types'

/**
 * This function check if a given point is inside of the items rect.
 * If it's in stacked view mode and a rect that is above another rect, it will return the upper one
 * If it's not in stacked view mode and not inside any rect, it will return the index of the closest rect
 */
export const findItemIndexAtPosition = (
  { x, y }: Point,
  itemsRect: DOMRect[],
  { fallbackToClosest = false, isStackedSourceSearch = false, isStackedTargetSearch = false } = {}
): number => {
  let smallestDistance = 10000
  let smallestDistanceIndex = -1
  const targetRectsIndexes: Array<number> = []
  let averageOverflowX = 0
  let averageOverflowY = 0

  if (isStackedTargetSearch) {
    for (let index = 0; index < itemsRect.length - 1; index++) {
      if (index === 0) continue
      const rect = itemsRect[index]
      const prevRect = itemsRect[index - 1]

      averageOverflowX += prevRect.right - rect.left
      averageOverflowY += prevRect.top - rect.bottom
    }

    averageOverflowX /= itemsRect.length
    averageOverflowY /= itemsRect.length
  }

  for (let index = 0; index < itemsRect.length; index += 1) {
    const rect = itemsRect[index]

    if (isStackedSourceSearch) {
      if (x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom) {
        // if it's in stacked view mode inside, we pick a collection of views under the cursor
        targetRectsIndexes.push(index)
        continue
      }
    } else if (isStackedTargetSearch) {
      if (
        x - averageOverflowX >= rect.left &&
        x - averageOverflowX < rect.right &&
        y - averageOverflowY >= rect.top &&
        y - averageOverflowY < rect.bottom
      ) {
        targetRectsIndexes.push(index)
        continue
      }
    } else {
      // if it's inside the rect and not in stacked view mode, we return the current index directly
      if (x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom) {
        return index
      }
    }

    if (fallbackToClosest) {
      // also we compute the distance and update the smallest distance index if needed
      const itemCenterX = (rect.left + rect.right) / 2
      const itemCenterY = (rect.top + rect.bottom) / 2

      const distance = Math.sqrt(Math.pow(x - itemCenterX, 2) + Math.pow(y - itemCenterY, 2)) // ** 2 operator is not supported on IE11
      if (distance < smallestDistance) {
        smallestDistance = distance
        smallestDistanceIndex = index
      }
    }
  }

  /* finally we return the fallback if fallbackToClosest is true OR we didn't find any views
   *  under cursor with a calculated overflowX and overflowY valued
   */
  if (fallbackToClosest || !targetRectsIndexes.length) {
    return smallestDistanceIndex
  }

  /* if fallbackToClosest is false and we found at least one view under the cursor
   *  we return the largest index which is the top item of stack under cursor
   */
  return Math.max(...targetRectsIndexes)
}
