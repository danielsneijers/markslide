import React from 'react'
import { shallow } from 'enzyme'
import { KEY_CODES } from 'constants'
import fullScreenOption from '../fullScreenOption'

const DummyComponent = props => <div {...props}>foo</div>
const Enhanced = fullScreenOption(DummyComponent)

let tree, instance

describe('higher-order-components/fullScreenOption', () => {
  beforeAll(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    tree = shallow(<Enhanced />)
    instance = tree.instance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('enhances a component with fullScreen capabilities', () => {
    expect(typeof instance.enterFullScreen === 'function').toBeTruthy()
  })

  describe('componentDidMount', () => {
    it('adds a keydown listener', () => {
      instance.componentDidMount()

      expect(window.addEventListener).toHaveBeenCalledTimes(1)
      expect(window.addEventListener).toBeCalledWith(
        'keydown',
        instance.handleKeyDown
      )
    })
  })

  describe('componentWillUnMount', () => {
    it('removes the keydown listener', () => {
      instance.componentWillUnMount()

      expect(window.removeEventListener).toHaveBeenCalledTimes(1)
      expect(window.removeEventListener).toBeCalledWith(
        'keydown',
        instance.handleKeyDown
      )
    })
  })

  describe('handleKeyDown', () => {
    it('enters full screen when F key is pressed', () => {
      instance.enterFullScreen = jest.fn()

      instance.handleKeyDown({ keyCode: KEY_CODES.UP })
      expect(instance.enterFullScreen).not.toHaveBeenCalled()

      instance.handleKeyDown({ keyCode: KEY_CODES.F })
      expect(instance.enterFullScreen).toHaveBeenCalledTimes(1)
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

      elems.forEach(elem => {
        instance.enterFullScreen(elem)
      })

      expect(elems[0].requestFullscreen).toHaveBeenCalled()
      expect(elems[1].webkitRequestFullscreen).toHaveBeenCalled()
      expect(elems[2].mozRequestFullScreen).toHaveBeenCalled()
      expect(elems[3].msRequestFullscreen).toHaveBeenCalled()
    })
  })
})
