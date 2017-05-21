import FakeStore from 'modules/__fixtures__/store'
import * as MainSelectors from 'modules/main/selectors'
import {
  getSlides,
  getSlidesAmount,
  getCurrentSlide,
  getCurrentSlideContent
} from '../selectors'

describe('Slide/selectors', () => {
  beforeAll(() => {
    MainSelectors.getSlideIndexFromLocation = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    MainSelectors.getSlideIndexFromLocation.mockReturnValue(2)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getSlides', () => {
    it('returns all slides in the store', () => {
      expect(getSlides(FakeStore)).toEqual(FakeStore.slide.all)
    })
  })

  describe('getSlidesAmount', () => {
    it('returns the amount of slides in the store', () => {
      expect(getSlidesAmount(FakeStore)).toBe(FakeStore.slide.all.length)
    })
  })

  describe('getCurrentSlide', () => {
    it('returns the current slide based on router state', () => {
      expect(getCurrentSlide(FakeStore)).toBe(FakeStore.slide.all[1])
    })
  })

  describe('getCurrentSlideContent', () => {
    it('returns the content of the current slide', () => {
      expect(getCurrentSlideContent(FakeStore)).toBe(
        FakeStore.slide.all[1].content
      )
    })
  })
})
