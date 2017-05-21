import { mapStateToProps } from '../container'
import FakeStore from 'modules/__fixtures__/store'

describe('ProgressBar/container', () => {
  describe('mapStateToProps', () => {
    it('returns Main props based in store state', () => {
      const stores = [
        {
          ...FakeStore,
          routing: { location: { pathname: '/1' } }
        },
        {
          ...FakeStore,
          routing: { location: { pathname: '/2' } }
        },
        {
          ...FakeStore,
          routing: { location: { pathname: '/3' } }
        },
        {
          ...FakeStore,
          routing: { location: { pathname: '/4' } }
        }
      ]
      const expectedStateProps = [
        { offset: 75 },
        { offset: 50 },
        { offset: 25 },
        { offset: 0 }
      ]

      stores.forEach((store, i) => {
        expect(mapStateToProps(store)).toEqual(expectedStateProps[i])
      })
    })
  })
})
