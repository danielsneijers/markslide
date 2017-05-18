import FakeStore from 'modules/__fixtures__/store'
import { getCurrentPath, getSlideIndexFromLocation } from '../selectors'

describe('Main/selectors', () => {
  describe('getCurrentPath', () => {
    it('returns the routers path from the store', () => {
      expect(getCurrentPath(FakeStore)).toBe('/2')
    })
  })

  describe('getCurrentPath', () => {
    it('returns the routers path from the store', () => {
      expect(getSlideIndexFromLocation(FakeStore)).toBe(2)
    })
  })
})
