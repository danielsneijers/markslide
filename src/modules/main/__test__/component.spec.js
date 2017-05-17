import React from 'react'
import { shallow } from 'enzyme'
import * as Themes from 'config/themes'
import { Main } from '../component'

let tree, instance
const routeContainer = <h1>Hello Test!</h1>

describe('components/Slide', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    Themes.applyTheme = jest.fn()
    tree = shallow(<Main routeContainer={routeContainer} />)
    instance = tree.instance()
  })

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })

  it('applies a Theme on mount', () => {
    Themes.applyTheme.mockClear()

    expect(Themes.applyTheme).not.toHaveBeenCalled()

    instance.componentWillMount()

    expect(Themes.applyTheme).toHaveBeenCalledTimes(1)
  })
})
