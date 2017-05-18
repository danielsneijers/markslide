import React from 'react'
import { mapStateToProps, mapDispatchToProps, mergeProps } from '../container'
import { SlideContainer } from 'modules/slide/default'
import FakeStore from 'modules/__fixtures__/store'

describe('Main/container', () => {
  const expectedStateProps = {
    index: 2,
    slideContent: '<p>Second slide</p>',
    totalSlides: 4
  }
  const expectedDispatchProps = {
    push: expect.any(Function)
  }

  describe('mapStateToProps', () => {
    it('returns Main props based in store state', () => {
      expect(mapStateToProps(FakeStore)).toEqual(expectedStateProps)

      const newState = {
        ...FakeStore,
        routing: { location: { pathname: '/3' } }
      }
      expect(mapStateToProps(newState)).toEqual({
        index: 3,
        slideContent: '<p>Third slide</p>',
        totalSlides: 4
      })
    })
  })

  describe('mapStateToProps', () => {
    it('returns Main actions object', () => {
      expect(mapDispatchToProps(() => null)).toEqual(expectedDispatchProps)
    })
  })

  describe('mergeProps', () => {
    let mainMergeProps

    beforeEach(() => {
      expectedDispatchProps.push = jest.fn()
      mainMergeProps = mergeProps(expectedStateProps, expectedDispatchProps)
    })

    it('returns Main props object', () => {
      expect(mainMergeProps).toEqual(
        expect.objectContaining({
          ...expectedStateProps,
          renderRouteContainer: expect.any(Function),
          nextSlide: expect.any(Function),
          previousSlide: expect.any(Function)
        })
      )
    })

    describe('renderRouteContainer', () => {
      it('returns a slide container', () => {
        expect(mainMergeProps.renderRouteContainer()).toEqual(
          <SlideContainer />
        )
      })
    })

    describe('nextSlide', () => {
      it('navigates to next slide', () => {
        expect(expectedDispatchProps.push).not.toHaveBeenCalled()

        mainMergeProps.nextSlide()

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

    describe('previousSlide', () => {
      it('navigates to previous slide', () => {
        expect(expectedDispatchProps.push).not.toHaveBeenCalled()

        mainMergeProps.previousSlide()

        expect(expectedDispatchProps.push).toHaveBeenCalledWith(
          `/${expectedStateProps.index - 1}`
        )
      })

      it("doesn't navigate to previous slide when you're on the first slide", () => {
        const newProps = {
          ...expectedStateProps,
          index: 1
        }
        const newMergeProps = mergeProps(newProps, expectedDispatchProps)

        expect(expectedDispatchProps.push).not.toHaveBeenCalled()

        newMergeProps.previousSlide()

        expect(expectedDispatchProps.push).not.toHaveBeenCalled()
      })
    })
  })
})
