import React from 'react'
import Slide from 'components/Slide'
import { parse } from 'utils/markdown'
import { getParamFromRouterProps } from 'utils/router'
import MarkdownSheets from '../../sheets.md'

const SlideContainer = (props) => {
  const getSlideIndexFromProps = getParamFromRouterProps('slide')
  const slideIndex = parseInt(getSlideIndexFromProps(props)) - 1 // Array index starts at 0
  const parsedMarkdown = parse(MarkdownSheets)

  return <Slide content={parsedMarkdown[slideIndex]} />
}

export default SlideContainer
