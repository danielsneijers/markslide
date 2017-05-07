import React from 'react'
import { shallow } from 'enzyme'
import { KEY_CODES } from 'constants'
import mockSheets from 'config/__mocks__/slides'
import * as MarkdownUtils from 'utils/markdown'
import * as SlideUtils from 'utils/slide'
import * as RouterUtils from 'utils/router'
import Slide from 'components/Slide'
import { withOutRouter as SlidesContainer } from '../SlidesContainer'

jest.useFakeTimers()

let props, tree, instance

describe('containers/SlidesContainer', () => {
  beforeAll(() => {
    const parsedSlides = MarkdownUtils.parse(mockSheets)
    const { content } = parsedSlides[0]

    MarkdownUtils.parse = jest.fn()
    MarkdownUtils.parse.mockReturnValue(parsedSlides)
    MarkdownUtils.slidesCount = jest.fn()
    MarkdownUtils.slidesCount.mockReturnValue(3)

    SlideUtils.getSlide = jest.fn()
    SlideUtils.getSlide.mockReturnValue(<Slide content={content} />)

    RouterUtils.getSlideIndexFromProps = jest.fn()
    RouterUtils.getSlideIndexFromProps.mockReturnValue(1)

    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    props = { navigateTo: jest.fn() }
    tree = shallow(<SlidesContainer {...props} />)
    instance = tree.instance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })

  it('sets the total amount of slides before mounting', () => {
    MarkdownUtils.slidesCount.mockClear()

    instance.updateIndex = jest.fn()
    instance.componentWillMount()

    expect(MarkdownUtils.slidesCount).toHaveBeenCalledTimes(1)
    expect(MarkdownUtils.slidesCount).toHaveBeenCalledWith(mockSheets)
    expect(instance.updateIndex).toHaveBeenCalledTimes(1)
    expect(instance.updateIndex).toHaveBeenCalledWith(props)
  })

  it('adds a window click and keydown handler when component is mounted', () => {
    instance.container = {
      addEventListener: jest.fn()
    }

    instance.componentDidMount()

    expect(instance.container.addEventListener).toHaveBeenCalledTimes(1)
    expect(instance.container.addEventListener).toBeCalledWith('click', instance.handleClick)

    expect(window.addEventListener).toHaveBeenCalledTimes(1)
    expect(window.addEventListener).toBeCalledWith('keydown', instance.handleKeyDown)
  })

  it('removes event listeners when component unmounts', () => {
    instance.container = {
      removeEventListener: jest.fn()
    }

    instance.componentWillUnMount()

    expect(instance.container.removeEventListener).toHaveBeenCalledTimes(1)
    expect(instance.container.removeEventListener).toBeCalledWith('click', instance.handleClick)

    expect(window.removeEventListener).toHaveBeenCalledTimes(1)
    expect(window.removeEventListener).toBeCalledWith('keydown', instance.handleKeyDown)
  })

  it('cancels throttled navigation calls', () => {
    instance.container = {
      removeEventListener: jest.fn()
    }

    instance.navigate.cancel = jest.fn()
    instance.componentWillUnMount()

    expect(instance.navigate.cancel).toHaveBeenCalledTimes(1)
  })

  it('updates the current index when it receives new props', () => {
    instance.updateIndex = jest.fn()

    expect(instance.updateIndex).not.toHaveBeenCalled()

    tree.setProps({ foo: 'bar' })
    tree.update()

    expect(instance.updateIndex).toHaveBeenCalledTimes(1)
    expect(instance.updateIndex).toHaveBeenCalledWith({ foo: 'bar', ...props })
  })

  describe('updateIndex', () => {
    it('updates the currentIndex', () => {
      expect(instance.currentIndex).toBe(1)

      RouterUtils.getSlideIndexFromProps.mockReturnValue(2)
      instance.updateIndex()

      expect(instance.currentIndex).toBe(2)
      expect(instance.props.navigateTo).not.toHaveBeenCalled()
    })

    it('navigates to last slide if index is out of bounds', () => {
      RouterUtils.getSlideIndexFromProps.mockReturnValue(5)
      instance.updateIndex(props)

      expect(instance.props.navigateTo).toHaveBeenCalledWith(`/${MarkdownUtils.slidesCount()}`)
    })

    it('navigates to first slide if index is below zero', () => {
      RouterUtils.getSlideIndexFromProps.mockReturnValue(-5)

      instance.updateIndex(props)

      expect(instance.props.navigateTo).toHaveBeenCalledWith('/1')
    })
  })

  describe('handleClick', () => {
    it('prevents default click behaviour', () => {
      const e = { preventDefault: jest.fn() }

      instance.handleClick(e)

      expect(e.preventDefault).toHaveBeenCalledTimes(1)
    })

    it('navigates to the next slide', () => {
      const e = { preventDefault: jest.fn() }
      instance.navigate = jest.fn()

      instance.handleClick(e)

      expect(instance.navigate).toHaveBeenCalledTimes(1)
      expect(instance.navigate).toHaveBeenCalledWith('next')
    })
  })

  describe('handleKeyDown', () => {
    it('navigates to previous slide with left and up', () => {
      const events = [
        { keyCode: KEY_CODES.LEFT },
        { keyCode: KEY_CODES.UP }
      ]

      instance.navigate = jest.fn()

      events.forEach((e) => {
        instance.handleKeyDown(e)
      })

      expect(instance.navigate).toHaveBeenCalledTimes(2)
      expect(instance.navigate).toHaveBeenCalledWith('prev')
      expect(instance.navigate).not.toHaveBeenCalledWith('next')
    })

    it('navigates to previous slide with left and up', () => {
      const events = [
        { keyCode: KEY_CODES.RIGHT },
        { keyCode: KEY_CODES.DOWN }
      ]

      instance.navigate = jest.fn()

      events.forEach((e) => {
        instance.handleKeyDown(e)
      })

      expect(instance.navigate).toHaveBeenCalledTimes(2)
      expect(instance.navigate).toHaveBeenCalledWith('next')
      expect(instance.navigate).not.toHaveBeenCalledWith('prev')
    })

    it('enters full screen when F key is pressed', () => {
      instance.enterFullScreen = jest.fn()

      instance.handleKeyDown({ keyCode: KEY_CODES.F })

      expect(instance.enterFullScreen).toHaveBeenCalledTimes(1)
    })
  })

  describe('navigate', () => {
    it('navigates to previous slide when PREV direction is given', () => {
      RouterUtils.getSlideIndexFromProps.mockReturnValue(3)

      instance.updateIndex()
      instance.navigate('prev')

      expect(props.navigateTo).toHaveBeenCalledWith('/2')
    })

    it('navigates to next slide when NEXT direction is given', () => {
      setTimeout(() => {
        instance.navigate('next')

        expect(props.navigateTo).toHaveBeenCalledWith('/2')
      }, 200)
    })

    it('doesn\'t navigate when PREV is below zero', () => {
      setTimeout(() => {
        instance.navigate('prev')

        expect(props.navigateTo).not.toHaveBeenCalled()
      }, 200)
    })

    it('doesn\'t navigate when NEXT is out of bounds', () => {
      setTimeout(() => {
        RouterUtils.getSlideIndexFromProps.mockReturnValue(3)

        instance.updateIndex()
        instance.navigate('next')

        expect(props.navigateTo).not.toHaveBeenCalled()
      })
    })

    it('is throttled at 200ms', () => {
      setTimeout(() => {
        instance.navigate('next')
        instance.navigate('next')
        instance.navigate('next')

        expect(props.navigateTo).toHaveBeenCalledTimes(1)
      }, 200)
    })
  })

  describe('enterFullScreen', () => {
    it('makes the provided element full screen', () => {
      const elems = [
        { requestFullscreen: jest.fn() },
        { webkitRequestFullscreen: jest.fn() },
        { mozRequestFullScreen: jest.fn() },
        { msRequestFullscreen: jest.fn() }
      ]

      elems.forEach((elem) => {
        instance.enterFullScreen(elem)
      })

      expect(elems[0].requestFullscreen).toHaveBeenCalled()
      expect(elems[1].webkitRequestFullscreen).toHaveBeenCalled()
      expect(elems[2].mozRequestFullScreen).toHaveBeenCalled()
      expect(elems[3].msRequestFullscreen).toHaveBeenCalled()
    })
  })
})
