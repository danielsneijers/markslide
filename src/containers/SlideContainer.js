import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { KEY_CODES } from 'constants'
import Slide from 'components/Slide'
import { parse, splitSlides } from 'utils/markdown'
import { getSlideIndexFromProps } from 'utils/router'
import MarkdownSheets from '../../sheets.md'

class SlideContainer extends PureComponent {
  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  componentWillUnMount () {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown (e) {
    const currentIndex = parseInt(getSlideIndexFromProps(this.props))
    const totalSlides = splitSlides(MarkdownSheets).length

    switch (e.keyCode) {
      case KEY_CODES.LEFT:
        currentIndex > 1 && this.props.navigateTo(`/${currentIndex - 1}`)
        break
      case KEY_CODES.RIGHT:
        currentIndex < totalSlides && this.props.navigateTo(`/${currentIndex + 1}`)
        break
      case KEY_CODES.F:
        this.enterFullScreen(this.container)
        break
    }
  }

  enterFullScreen (elem) {
    if (elem.requestFullscreen) {
      return elem.requestFullscreen()
    }

    if (elem.webkitRequestFullscreen) {
      return elem.webkitRequestFullscreen()
    }

    if (elem.mozRequestFullScreen) {
      return elem.mozRequestFullScreen()
    }

    if (elem.msRequestFullscreen) {
      return elem.msRequestFullscreen()
    }
  }

  render () {
    const slideIndex = parseInt(getSlideIndexFromProps(this.props)) - 1 // Array index starts at 0
    const parsedMarkdown = parse(MarkdownSheets)

    return (
      <div ref={(c) => { this.container = c }}>
        <Slide content={parsedMarkdown[slideIndex]} />
      </div>
    )
  }
}

SlideContainer.propTypes = {
  navigateTo: PropTypes.func
}

export default SlideContainer
