import React from 'react'
import { shallow } from 'enzyme'
import SlideCode from 'components/SlideCode'
import * as viewport from 'utils/viewport'

jest.useFakeTimers()

let tree, instance
const content = `<pre><code class='lang-javascript'>console<span class='token punctuation'>.</span><span class='token function'>log</span><span class='token punctuation'>(</span><span class='token string'>'hello world!'</span><span class='token punctuation'>)</span></code></pre>`

describe('components/SlideCode', () => {
  beforeEach(() => {
    tree = shallow(<SlideCode content={content} />)
    instance = tree.instance()

    window.addEventListener = jest.fn()
  })

  afterEach(() => {
    window.addEventListener.mockReset()
  })

  test('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })

  test('checks if scaling is needed when component is mounted', () => {
    instance.checkForScaling = jest.fn()
    expect(instance.checkForScaling).toHaveBeenCalledTimes(0)

    instance.componentDidMount()
    expect(instance.checkForScaling).toHaveBeenCalledTimes(1)
  })

  test('adds a window resize listener when component is mounted', () => {
    instance.componentDidMount()

    expect(window.addEventListener).toHaveBeenCalledTimes(1)
    expect(window.addEventListener).toBeCalledWith('resize', instance.checkForScaling)
  })

  test('checks if scaling is needed when component receives props', () => {
    instance.checkForScaling = jest.fn()
    expect(instance.checkForScaling).toHaveBeenCalledTimes(0)

    tree.setProps({ content })
    tree.update()

    expect(instance.checkForScaling).toHaveBeenCalledTimes(1)
  })

  describe('checkForScaling', () => {
    it('doesn\'t apply scaling when content fits viewport', () => {
      const setStateArguements = {
        style: {
          opacity: 1,
          position: 'absolute',
          transform: 'scale(1) translateY(0)',
          width: '90%'
        }
      }

      instance.setState = jest.fn()
      viewport.elementFitsViewport = jest.fn()
      viewport.elementFitsViewport.mockReturnValue(true)

      expect(instance.setState).toHaveBeenCalledTimes(0)

      instance.checkForScaling()
      jest.runAllTimers()

      expect(instance.setState).toHaveBeenCalledTimes(1)
      expect(instance.setState).toBeCalledWith(setStateArguements)
    })
  })

  it('applies scaling when content doesn\'t fit viewport', () => {
    const setStateArguements = {
      style: {
        opacity: 1,
        position: 'absolute',
        transform: 'scale(0.5) translateY(0)',
        width: '180%'
      }
    }

    instance.setState = jest.fn()
    viewport.elementFitsViewport = jest.fn()
    viewport.elementFitsViewport.mockReturnValue(false)
    viewport.scaleElementToFit = jest.fn()
    viewport.scaleElementToFit.mockReturnValue(0.5)

    expect(instance.setState).toHaveBeenCalledTimes(0)

    instance.checkForScaling()
    jest.runAllTimers()

    expect(instance.setState).toHaveBeenCalledTimes(1)
    expect(instance.setState).toBeCalledWith(setStateArguements)
  })
})
