import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from 'components/ProgressBar'

describe('components/ProgressBar', () => {
  it('renders correctly', () => {
    const tree = shallow(<ProgressBar offset={-30} />)

    expect(tree).toMatchSnapshot()
  })
})
