// @flow
import React, { PureComponent } from 'react'
import { throttle } from 'lodash'
import { withRouter } from 'react-router'
import { KEY_CODES } from 'constants'
import MarkdownSheets from 'config/slides.md'
import { parse, slidesCount } from 'utils/markdown'
import { getSlideIndexFromProps } from 'utils/router'
import { getProgressBar } from 'utils/settings'
import { getSlide } from 'utils/slide'

type Props = {
  navigateTo: Function
}

const NEXT = 'next'
const PREV = 'prev'

class SlidesContainer extends PureComponent {
  props: Props
  totalSlides: number
  currentIndex: number
  container: HTMLDivElement

  componentWillMount () {
    this.totalSlides = slidesCount(MarkdownSheets)
    this.updateIndex(this.props)
  }

  componentDidMount () {
    this.container.addEventListener('click', this.handleClick)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillReceiveProps (nextProps: Props) {
    this.updateIndex(nextProps)
  }

  componentWillUnMount () {
    this.container.removeEventListener('click', this.handleClick)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  updateIndex (props: Props) {
    this.currentIndex = parseInt(getSlideIndexFromProps(props))

    if (this.currentIndex > this.totalSlides) {
      props.navigateTo(`/${this.totalSlides}`)
    }

    if (this.currentIndex < 1) {
      props.navigateTo('/1')
    }
  }

  handleClick = (e: MouseEvent) => {
    e.preventDefault()
    this.navigate(NEXT)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case KEY_CODES.LEFT:
      case KEY_CODES.UP:
        this.navigate(PREV)
        break
      case KEY_CODES.RIGHT:
      case KEY_CODES.DOWN:
        this.navigate(NEXT)
        break
      case KEY_CODES.F:
        this.enterFullScreen(this.container)
        break
    }
  }

  navigate = throttle((direction) => {
    direction === PREV
      ? this.currentIndex > 1 && this.props.navigateTo(`/${this.currentIndex - 1}`)
      : this.currentIndex < this.totalSlides && this.props.navigateTo(`/${this.currentIndex + 1}`)
  }, 200)

  enterFullScreen (elem: HTMLDivElement) {
    if (elem.requestFullscreen) elem.requestFullscreen()
    // $FlowFixMe
    if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
    // $FlowFixMe
    if (elem.mozRequestFullScreen) elem.mozRequestFullScreen()
    // $FlowFixMe
    if (elem.msRequestFullscreen) elem.msRequestFullscreen()
  }

  render () {
    const parsedMarkdown = parse(MarkdownSheets)
    const progressBarProps = { offset: (1 - this.currentIndex / this.totalSlides) * 100 }
    const { content = '' } = parsedMarkdown[this.currentIndex - 1] || {}
    const slideProps = {
      uniqueKey: `slide-${this.currentIndex}`
    }

    return (
      <div ref={(c) => { this.container = c }}>
        {getProgressBar(progressBarProps)}
        {getSlide(content, slideProps)}
      </div>
    )
  }
}

export default withRouter(SlidesContainer)
export const withOutRouter = SlidesContainer
