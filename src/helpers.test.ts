import * as helpers from './helpers'

const getRect = ({
  left,
  top,
  width,
  height,
}: {
  left: number
  top: number
  width: number
  height: number
}): DOMRect => ({
  top,
  left,
  width,
  height,
  right: left + width,
  bottom: top + height,
  x: left,
  y: top,
  toJSON: () => '',
})

describe('SortableList helpers', () => {
  describe('findItemIndexAtPosition', () => {
    it('should return 0 if point is in the first item', () => {
      const point = { x: 20, y: 20 }
      const rects: DOMRect[] = [
        getRect({ left: 10, top: 10, width: 100, height: 100 }),
        getRect({ left: 120, top: 10, width: 100, height: 100 }),
        getRect({ left: 230, top: 10, width: 100, height: 100 }),
      ]

      const index = helpers.findItemIndexAtPosition(point, rects)

      expect(index).toEqual(0)
    })

    it('should return 2 if point is in the last item', () => {
      const point = { x: 300, y: 50 }
      const rects: DOMRect[] = [
        getRect({ left: 10, top: 10, width: 100, height: 100 }),
        getRect({ left: 120, top: 10, width: 100, height: 100 }),
        getRect({ left: 230, top: 10, width: 100, height: 100 }),
      ]

      const index = helpers.findItemIndexAtPosition(point, rects)

      expect(index).toEqual(2)
    })
    it('should return the right index if point is inside an item positioned in a grid', () => {
      const point = { x: 100, y: 200 }
      const rects: DOMRect[] = [
        getRect({ left: 10, top: 10, width: 100, height: 100 }),
        getRect({ left: 120, top: 10, width: 100, height: 100 }),
        getRect({ left: 10, top: 120, width: 100, height: 100 }),
        getRect({ left: 120, top: 120, width: 100, height: 100 }),
      ]

      const index = helpers.findItemIndexAtPosition(point, rects)

      expect(index).toEqual(2)
    })

    it('should return -1 if point is not inside any items and fallbackToClosest is false', () => {
      const point = { x: 150, y: -20 }
      const rects: DOMRect[] = [
        getRect({ left: 10, top: 10, width: 100, height: 100 }),
        getRect({ left: 120, top: 10, width: 100, height: 100 }),
        getRect({ left: 230, top: 10, width: 100, height: 100 }),
      ]

      const index = helpers.findItemIndexAtPosition(point, rects, { fallbackToClosest: false })

      expect(index).toEqual(-1)
    })
    it('should the closest index if point is not inside any items and fallbackToClosest is true', () => {
      const point = { x: 150, y: -20 }
      const rects: DOMRect[] = [
        getRect({ left: 10, top: 10, width: 100, height: 100 }),
        getRect({ left: 120, top: 10, width: 100, height: 100 }),
        getRect({ left: 230, top: 10, width: 100, height: 100 }),
      ]

      const index = helpers.findItemIndexAtPosition(point, rects, { fallbackToClosest: true })

      expect(index).toEqual(1)
    })
  })
})
