import {
  getElementSize,
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
    it('returns dimensions of HTML Element', () => {
      const div = createDiv()

      expect(getElementSize(div)).toEqual({ width: 597, height: 1627 })
    })
  })

  describe('dimensionsFitViewport', () => {
    it('returns true when element fits in window', () => {
      const dimensions = createDiv(500, 500).getBoundingClientRect()

      expect(dimensionsFitViewport(dimensions)).toEqual(true)
    })

    it("returns false when element doesn't fit in window", () => {
      const dimensions = createDiv(2000, 2000).getBoundingClientRect()
      const divTooWide = createDiv(2000, 10).getBoundingClientRect()
      const divTooTall = createDiv(10, 2000).getBoundingClientRect()

      expect(dimensionsFitViewport(dimensions)).toEqual(false)
      expect(dimensionsFitViewport(divTooWide)).toEqual(false)
      expect(dimensionsFitViewport(divTooTall)).toEqual(false)
    })
  })

  describe('elementOutOfBoundFraction', () => {
    it('returns out of bounds percentage of width and height', () => {
      const dimensions = createDiv(1200, 800).getBoundingClientRect()

      expect(elementOutOfBoundFraction(dimensions)).toEqual({
        height: 0.96,
        width: 0.8533333333333334
      })
    })
  })

  describe('scaleToFit', () => {
    it('returns fraction of width to scale when width offset is largest', () => {
      const dimensions = elementOutOfBoundFraction(
        createDiv(1200, 800).getBoundingClientRect()
      )

      expect(scaleToFit(dimensions)).toBe(dimensions.width)
    })

    it('returns fraction of width to scale when width offset is largest', () => {
      const dimensions = elementOutOfBoundFraction(
        createDiv(800, 1200).getBoundingClientRect()
      )

      expect(scaleToFit(dimensions)).toBe(dimensions.height)
    })
  })

  describe('elementFitsViewport', () => {
    it('returns true when element fits viewport', () => {
      const div = createDiv(200, 200)

      expect(elementFitsViewport(div)).toBe(true)
    })

    it("returns false when element doesn't fit viewport", () => {
      const div = createDiv()

      expect(elementFitsViewport(div)).toBe(false)
    })
  })

  describe('scaleElementToFit', () => {
    it('returns percentage of element to scale to fit viewport', () => {
      const div = createDiv()

      expect(scaleElementToFit(div)).toBe(0.47203441917639827)
    })
  })
})
