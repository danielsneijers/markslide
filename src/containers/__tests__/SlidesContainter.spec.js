import React from 'react'
import { shallow } from 'enzyme'
import mockSheets from 'config/__mocks__/slides'
import * as MarkdownUtils from 'utils/markdown'
import * as SlideUtils from 'utils/slide'
import * as RouterUtils from 'utils/router'
import Slide from 'components/Slide'
import { withOutRouter as SlidesContainer } from '../SlidesContainer'

let props, tree

describe('containers/SlidesContainer', () => {
  beforeEach(() => {
    const content = MarkdownUtils.parse(mockSheets)

    MarkdownUtils.parse = jest.fn()
    MarkdownUtils.parse.mockReturnValue(content)
    MarkdownUtils.slidesCount = jest.fn()
    MarkdownUtils.slidesCount.mockReturnValue(3)

    SlideUtils.getSlide = jest.fn()
    SlideUtils.getSlide.mockReturnValue(<Slide content={content[0]} onClick={() => null} />)

    RouterUtils.getSlideIndexFromProps = jest.fn()
    RouterUtils.getSlideIndexFromProps.mockReturnValue(1)

    props = { navigateTo: () => null }
    tree = shallow(<SlidesContainer {...props} />)
  })

  afterEach(() => {
    MarkdownUtils.parse.mockReset()
    MarkdownUtils.slidesCount.mockReset()
    SlideUtils.getSlide.mockReset()
    RouterUtils.getSlideIndexFromProps.mockReset()
  })

  test('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })
})
