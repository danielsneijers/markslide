import React from 'react'
import { shallow } from 'enzyme'
import Slide from 'components/Slide'

describe('components/Slide', () => {
  it('renders correctly', () => {
    const content = <h1>Hello Test!</h1>
    const tree = shallow(<Slide content={content} />)

    expect(tree).toMatchSnapshot()
  })
})
