import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { withRouter } from 'react-router'
import { KEY_CODES } from 'constants'
import { parse, slidesCount } from 'utils/markdown'
import { getSlideIndexFromProps } from 'utils/router'
import { getProgressBar } from 'utils/settings'
import Slide from 'components/Slide'
import MarkdownSheets from '../../slides.md'

const NEXT = 'next'
const PREV = 'prev'

class SlideContainer extends PureComponent {
  constructor () {
    super()

    this.navigate = throttle(this.navigate, 200)
  }

  componentWillMount () {
    this.totalSlides = slidesCount(MarkdownSheets)
    this.updateIndex(this.props)
  }

  componentDidMount () {
    window.addEventListener('click', this.handleClick.bind(this))
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    this.updateIndex(nextProps)
  }

  componentWillUnMount () {
    window.removeEventListener('click', this.handleClick.bind(this))
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  updateIndex (props) {
    this.currentIndex = parseInt(getSlideIndexFromProps(props))

    if (this.currentIndex > this.totalSlides) {
      props.navigateTo(`/${this.totalSlides}`)
    }

    if (this.currentIndex < 1) {
      props.navigateTo('/1')
    }
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
    direction === PREV
      ? this.currentIndex > 1 && this.props.navigateTo(`/${this.currentIndex - 1}`)
      : this.currentIndex < this.totalSlides && this.props.navigateTo(`/${this.currentIndex + 1}`)
  }

  enterFullScreen (elem) {
    if (elem.requestFullscreen) elem.requestFullscreen()
    if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
    if (elem.mozRequestFullScreen) elem.mozRequestFullScreen()
    if (elem.msRequestFullscreen) elem.msRequestFullscreen()
  }

  render () {
    const parsedMarkdown = parse(MarkdownSheets)
    const progressBarProps = { offset: (1 - this.currentIndex / this.totalSlides) * 100 }

    return (
      <div ref={(c) => { this.container = c }}>
        {getProgressBar(progressBarProps)}
        <Slide
          key={`slide-${this.currentIndex}`}
          content={parsedMarkdown[this.currentIndex - 1]} // Array starts at 0 index
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
