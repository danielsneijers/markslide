import {
  getElementSize,
  memoizedGetElementSize,
  dimensionsFitViewport,
  elementOutOfBoundFraction,
  scaleToFit,
  elementFitsViewport,
  scaleElementToFit
} from '../viewport'

function createDiv (width = 597.5994262695312, height = 1627.443115234375) {
  const div = document.createElement('div')

  div.getBoundingClientRect = () => ({
    width,
    height,
    bottom: 1187.358154296875,
    left: 30.752840042114258,
    right: 628.352294921875,
    top: -440.0849914550781
  })

  return div
}

describe('utils/viewport', () => {
  beforeAll(() => {
    window.innerWidth = 1024
    window.innerHeight = 768
  })

  describe('getElementSize', () => {
    test('returns dimensions of HTML Element', () => {
      const div = createDiv()

      expect(getElementSize(div)).toEqual({ width: 597, height: 1627 })
    })
  })

  describe('memoizedGetElementSize', () => {
    test('returns dimensions of HTML Element', () => {
      const div = createDiv()

      expect(memoizedGetElementSize(div)).toEqual({ width: 597, height: 1627 })
    })

    test('returns different output with different input (test memoization implementation)', () => {
      const div = createDiv()
      const div2 = createDiv(150.2, 122.1)

      expect(memoizedGetElementSize(div)).toEqual({ width: 597, height: 1627 })
      expect(memoizedGetElementSize(div2)).toEqual({ width: 150, height: 122 })
    })
  })

  describe('dimensionsFitViewport', () => {
    test('returns true when element fits in window', () => {
      const dimensions = createDiv(500, 500).getBoundingClientRect()

      expect(dimensionsFitViewport(dimensions)).toEqual(true)
    })

    test('returns false when element doesn\'t fit in window', () => {
      const dimensions = createDiv(2000, 2000).getBoundingClientRect()
      const divTooWide = createDiv(2000, 10).getBoundingClientRect()
      const divTooTall = createDiv(10, 2000).getBoundingClientRect()

      expect(dimensionsFitViewport(dimensions)).toEqual(false)
      expect(dimensionsFitViewport(divTooWide)).toEqual(false)
      expect(dimensionsFitViewport(divTooTall)).toEqual(false)
    })
  })

  describe('elementOutOfBoundFraction', () => {
    test('returns out of bounds percentage of width and height', () => {
      const dimensions = createDiv(1200, 800).getBoundingClientRect()

      expect(elementOutOfBoundFraction(dimensions)).toEqual({ height: 0.96, width: 0.8533333333333334 })
    })
  })

  describe('scaleToFit', () => {
    test('returns fraction of width to scale when width offset is largest', () => {
      const dimensions = elementOutOfBoundFraction(createDiv(1200, 800).getBoundingClientRect())

      expect(scaleToFit(dimensions)).toBe(dimensions.width)
    })

    test('returns fraction of width to scale when width offset is largest', () => {
      const dimensions = elementOutOfBoundFraction(createDiv(800, 1200).getBoundingClientRect())

      expect(scaleToFit(dimensions)).toBe(dimensions.height)
    })
  })

  describe('elementFitsViewport', () => {
    test('returns true when element fits viewport', () => {
      const div = createDiv(200, 200)

      expect(elementFitsViewport(div)).toBe(true)
    })

    test('returns false when element doesn\'t fit viewport', () => {
      const div = createDiv()

      expect(elementFitsViewport(div)).toBe(false)
    })
  })

  describe('scaleElementToFit', () => {
    test('returns percentage of element to scale to fit viewport', () => {
      const div = createDiv()

      expect(scaleElementToFit(div)).toBe(0.47203441917639827)
    })
  })
})
