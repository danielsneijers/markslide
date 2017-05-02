import React from 'react'
import { shallow, mount } from 'enzyme'
import SlideCode from 'components/SlideCode'
import * as ViewportUtils from 'utils/viewport'

jest.useFakeTimers()

let tree, instance
const content = `<pre><code class='lang-javascript'>console<span class='token punctuation'>.</span><span class='token function'>log</span><span class='token punctuation'>(</span><span class='token string'>'hello world!'</span><span class='token punctuation'>)</span></code></pre>`

describe('components/SlideCode', () => {
  beforeAll(() => {
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  afterAll(() => {
    window.addEventListener.mockReset()
    window.removeEventListener.mockReset()
  })

  beforeEach(() => {
    tree = shallow(<SlideCode content={content} index={1} />)
    instance = tree.instance()
  })

  afterEach(() => {
    window.addEventListener.mockClear()
    window.removeEventListener.mockClear()
  })

  it('renders correctly', () => {
    // use mount here so the ref is hit for coverage
    const wrapper = mount(<SlideCode content={content} index={1} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('checks if scaling is needed when component is mounted', () => {
    instance.checkForScaling = jest.fn()
    expect(instance.checkForScaling).not.toHaveBeenCalled()

    instance.componentDidMount()
    expect(instance.checkForScaling).toHaveBeenCalledTimes(1)
  })

  it('adds a window resize listener when component is mounted', () => {
    instance.componentDidMount()

    expect(window.addEventListener).toHaveBeenCalledTimes(1)
    expect(window.addEventListener).toBeCalledWith('resize', instance.checkForScaling)
  })

  it('removes the window resize listener when component is unmounted', () => {
    instance.componentWillUnMount()

    expect(window.removeEventListener).toHaveBeenCalledTimes(1)
    expect(window.removeEventListener).toBeCalledWith('resize', instance.checkForScaling)
  })

  it('checks if scaling is needed when component receives props', () => {
    instance.checkForScaling = jest.fn()
    expect(instance.checkForScaling).not.toHaveBeenCalled()

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
          transform: 'scale(1)',
          width: '90%'
        }
      }

      instance.setState = jest.fn()
      ViewportUtils.elementFitsViewport = jest.fn()
      ViewportUtils.elementFitsViewport.mockReturnValue(true)

      expect(instance.setState).not.toHaveBeenCalled()

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
        transform: 'scale(0.5)',
        width: '180%'
      }
    }

    instance.setState = jest.fn()
    ViewportUtils.elementFitsViewport = jest.fn()
    ViewportUtils.elementFitsViewport.mockReturnValue(false)
    ViewportUtils.scaleElementToFit = jest.fn()
    ViewportUtils.scaleElementToFit.mockReturnValue(0.5)

    expect(instance.setState).not.toHaveBeenCalled()

    instance.checkForScaling()
    jest.runAllTimers()

    expect(instance.setState).toHaveBeenCalledTimes(1)
    expect(instance.setState).toBeCalledWith(setStateArguements)
  })
})
