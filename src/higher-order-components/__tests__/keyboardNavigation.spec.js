import React from 'react'
import { shallow } from 'enzyme'
import { KEY_CODES } from 'constants'
import keyboardNavigation from '../keyboardNavigation'

const DummyComponent = props => <div {...props}>foo</div>
const Enhanced = keyboardNavigation(DummyComponent)

let tree, instance, hocProps

describe('higher-order-components/keyboardNavigation', () => {
  beforeAll(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    hocProps = { nextSlide: jest.fn(), previousSlide: jest.fn() }
    tree = shallow(<Enhanced {...hocProps} />)
    instance = tree.instance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('enhances a component with fullScreen capabilities', () => {
    expect(typeof instance.handleKeyDown === 'function').toBeTruthy()
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
    it('navigates to previous slide when left key is pressed', () => {
      const { previousSlide } = hocProps

      instance.handleKeyDown({ keyCode: KEY_CODES.F })
      expect(previousSlide).not.toHaveBeenCalled()

      instance.handleKeyDown({ keyCode: KEY_CODES.LEFT })
      expect(previousSlide).toHaveBeenCalledTimes(1)
    })

    it('navigates to previous slide when up key is pressed', () => {
      const { previousSlide } = hocProps

      instance.handleKeyDown({ keyCode: KEY_CODES.UP })
      expect(previousSlide).toHaveBeenCalledTimes(1)
    })

    it('navigates to next slide when right key is pressed', () => {
      const { nextSlide } = hocProps

      instance.handleKeyDown({ keyCode: KEY_CODES.RIGHT })
      expect(nextSlide).toHaveBeenCalledTimes(1)
    })

    it('navigates to next slide when down key is pressed', () => {
      const { nextSlide } = hocProps

      instance.handleKeyDown({ keyCode: KEY_CODES.DOWN })
      expect(nextSlide).toHaveBeenCalledTimes(1)
    })
  })
})
