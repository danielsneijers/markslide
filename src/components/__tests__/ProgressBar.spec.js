import React from 'react'
import { shallow } from 'enzyme'
import ProgressBar from 'components/ProgressBar'

describe('components/ProgressBar', () => {
  test('renders correctly', () => {
    const tree = shallow(<ProgressBar offset={-30} />)

    expect(tree).toMatchSnapshot()
  })
})
