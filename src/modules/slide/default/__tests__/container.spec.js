import { mapStateToProps, mapDispatchToProps, mergeProps } from '../container'
import FakeStore from 'modules/__fixtures__/store'

describe('slide/default/container', () => {
  const expectedStateProps = {
    content: '<p>Second slide</p>',
    index: 2,
    meta: {},
    totalSlides: 4
  }
  const expectedDispatchProps = {
    push: expect.any(Function)
  }

  describe('mapStateToProps', () => {
    it('returns Slide props based in store state', () => {
      expect(mapStateToProps(FakeStore)).toEqual(expectedStateProps)

      const newState = {
        ...FakeStore,
        routing: { location: { pathname: '/3' } }
      }
      expect(mapStateToProps(newState)).toEqual({
        index: 3,
        content: '<p>Third slide</p>',
        meta: {},
        totalSlides: 4
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('returns Slide actions object', () => {
      expect(mapDispatchToProps(() => null)).toEqual(expectedDispatchProps)
    })
  })

  describe('mergeProps', () => {
    let slideMergeProps

    beforeEach(() => {
      expectedDispatchProps.push = jest.fn()
      slideMergeProps = mergeProps(expectedStateProps, expectedDispatchProps)
    })

    it('returns Slide props object', () => {
      expect(slideMergeProps).toEqual(
        expect.objectContaining({
          ...expectedStateProps,
          nextSlide: expect.any(Function)
        })
      )
    })

    describe('nextSlide', () => {
      it('navigates to next slide', () => {
        expect(expectedDispatchProps.push).not.toHaveBeenCalled()

        slideMergeProps.nextSlide()

        expect(expectedDispatchProps.push).toHaveBeenCalledWith(
          `/${expectedStateProps.index + 1}`
        )
      })

      it("doesn't navigate to next slide when you're on the last slide", () => {
        const newProps = {
          ...expectedStateProps,
          index: 4
        }
        const newMergeProps = mergeProps(newProps, expectedDispatchProps)

        expect(expectedDispatchProps.push).not.toHaveBeenCalled()

        newMergeProps.nextSlide()

        expect(expectedDispatchProps.push).not.toHaveBeenCalled()
      })
    })
  })
})
