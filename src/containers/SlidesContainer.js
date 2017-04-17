import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { withRouter } from 'react-router'
import { KEY_CODES } from 'constants'
import { parse, slidesCount } from 'utils/markdown'
import { getSlideIndexFromProps } from 'utils/router'
import ProgressBar from 'components/ProgressBar'
import Slide from 'components/Slide'
import MarkdownSheets from '../../slides.md'

const NEXT = 'next'
const PREV = 'prev'

class SlideContainer extends PureComponent {
  constructor () {
    super()

    this.navigate = throttle(this.navigate, 200)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleClick.bind(this))
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUnMount () {
    window.removeEventListener('click', this.handleClick.bind(this))
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleClick (e) {
    this.navigate(NEXT)
  }

  handleKeyDown (e) {
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

  navigate (direction) {
    const currentIndex = parseInt(getSlideIndexFromProps(this.props))
    const totalSlides = slidesCount(MarkdownSheets)

    direction === PREV
      ? currentIndex > 1 && this.props.navigateTo(`/${currentIndex - 1}`)
      : currentIndex < totalSlides && this.props.navigateTo(`/${currentIndex + 1}`)
  }

  enterFullScreen (elem) {
    if (elem.requestFullscreen) elem.requestFullscreen()
    if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
    if (elem.mozRequestFullScreen) elem.mozRequestFullScreen()
    if (elem.msRequestFullscreen) elem.msRequestFullscreen()
  }

  render () {
    const slideIndex = parseInt(getSlideIndexFromProps(this.props))
    const totalSlides = slidesCount(MarkdownSheets)
    const parsedMarkdown = parse(MarkdownSheets)
    const progressBarOffset = (1 - slideIndex / totalSlides) * 100

    return (
      <div ref={(c) => { this.container = c }}>
        <ProgressBar offset={progressBarOffset} />
        <Slide
          key={`slide-${slideIndex}`}
          content={parsedMarkdown[slideIndex - 1]} // Array starts at 0 index
          onClick={this.handleClick}
        />
      </div>
    )
  }
}

SlideContainer.propTypes = {
  navigateTo: PropTypes.func.isRequired
}

export default withRouter(SlideContainer)
