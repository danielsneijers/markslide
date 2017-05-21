import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from '../component'

describe('ProgressBar/component', () => {
  it('renders correctly', () => {
    const tree = shallow(<ProgressBar offset={-30} />)

    expect(tree).toMatchSnapshot()
  })
})
