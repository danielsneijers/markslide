import React from 'react'
import { shallow } from 'enzyme'
import { component as CodeSlide } from '../component'

let tree
const componentProps = {
  index: 2,
  content: `<pre><code class="lang-javascript"><span class='code-row'>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span></span></code></pre>`,
  meta: {},
  nextSlide: jest.fn(),
  style: {}
}

describe('slide/code/component', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    tree = shallow(<CodeSlide {...componentProps} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })

  it('navigates to next slide onClick', () => {
    expect(componentProps.nextSlide).not.toHaveBeenCalled()

    tree.find('#slide-2').simulate('click')

    expect(componentProps.nextSlide).toHaveBeenCalled()
  })
})
