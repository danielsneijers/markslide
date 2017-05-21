import FakeStore from 'modules/__fixtures__/store'
import slides from '../reducer'

describe('modules/slide/reducer', () => {
  describe('slides', () => {
    it('returns the store state by default', () => {
      const action = { type: 'foo' }

      expect(slides(undefined, action)).toEqual([])
      expect(slides(FakeStore.slide, action)).toEqual(FakeStore.slide)
    })
  })
})
