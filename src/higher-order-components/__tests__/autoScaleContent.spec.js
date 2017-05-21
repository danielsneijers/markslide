import React from 'react'
import { shallow } from 'enzyme'
import * as ViewportUtils from 'utils/viewport'
import autoScaleContent from '../autoScaleContent'

jest.useFakeTimers()

const DummyComponent = props => <div {...props}>foo</div>
const Enhanced = autoScaleContent(DummyComponent)

let tree, instance

describe('higher-order-components/autoScaleContent', () => {
  beforeAll(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
    ViewportUtils.elementFitsViewport = jest.fn()
    ViewportUtils.scaleElementToFit = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    tree = shallow(<Enhanced index={1} />)
    instance = tree.instance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('enhances a component with autoscale capabilities', () => {
    expect(typeof instance.checkForScaling === 'function').toBeTruthy()
  })

  describe('componentDidMount', () => {
    it('checks if scaling is needed', () => {
      instance.checkForScaling = jest.fn()
      expect(instance.checkForScaling).not.toHaveBeenCalled()

      instance.componentDidMount()
      expect(instance.checkForScaling).toHaveBeenCalledTimes(1)
    })

    it('adds a window resize listener', () => {
      instance.componentDidMount()

      expect(window.addEventListener).toHaveBeenCalledTimes(1)
      expect(window.addEventListener).toBeCalledWith(
        'resize',
        instance.checkForScaling
      )
    })
  })

  describe('componentWillUnMount', () => {
    it('removes the window resize listener', () => {
      instance.checkForScaling.cancel = jest.fn()
      instance.componentWillUnMount()

      expect(window.removeEventListener).toHaveBeenCalledTimes(1)
      expect(window.removeEventListener).toBeCalledWith(
        'resize',
        instance.checkForScaling
      )
    })

    it('cancels debounced methods', () => {
      instance.checkForScaling.cancel = jest.fn()
      instance.componentWillUnMount()

      expect(instance.checkForScaling.cancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('componentWillReceiveProps', () => {
    it('checks if scaling is needed', () => {
      instance.checkForScaling = jest.fn()
      expect(instance.checkForScaling).not.toHaveBeenCalled()

      tree.setProps({ index: 2 })
      tree.update()

      expect(instance.checkForScaling).toHaveBeenCalledTimes(1)
    })
  })

  describe('checkForScaling', () => {
    it("doesn't apply scaling when content fits viewport", () => {
      const setStateArguements = {
        style: {
          opacity: 1,
          position: 'relative',
          transform: 'scale(1)',
          width: 'auto'
        }
      }

      instance.setState = jest.fn()
      ViewportUtils.elementFitsViewport.mockReturnValue(true)

      expect(instance.setState).not.toHaveBeenCalled()

      instance.checkForScaling()
      jest.runAllTimers()

      expect(instance.setState).toHaveBeenCalledTimes(1)
      expect(instance.setState).toBeCalledWith(setStateArguements)
    })

    it("applies scaling when content doesn't fit viewport", () => {
      const setStateArguements = {
        style: {
          opacity: 1,
          position: 'absolute',
          transform: 'scale(0.5)',
          width: '180%'
        }
      }

      instance.setState = jest.fn()
      ViewportUtils.elementFitsViewport.mockReturnValue(false)

      ViewportUtils.scaleElementToFit.mockReturnValue(0.5)

      expect(instance.setState).not.toHaveBeenCalled()

      instance.checkForScaling()
      jest.runAllTimers()

      expect(instance.setState).toHaveBeenCalledTimes(1)
      expect(instance.setState).toBeCalledWith(setStateArguements)
    })
  })
})
