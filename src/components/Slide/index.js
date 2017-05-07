// @flow
import React, { PureComponent } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { elementFitsViewport, scaleElementToFit } from 'utils/viewport'
import CSS from './style.css'

type Props = {
  index: number,
  content: string,
  className?: string
}

type State = {
  style: {
    transform?: string,
    position?: string,
    width?: string
  }
}

const SLIDE_ID: string = 'slide-content'

class Slide extends PureComponent {
  props: Props
  state: State

  initialState = { style: {} }
  state = this.initialState

  componentDidMount () {
    this.checkForScaling()

    window.addEventListener('resize', this.checkForScaling)
  }

  componentWillReceiveProps () {
    this.setState(this.initialState)
    this.checkForScaling()
  }

  componentWillUnMount () {
    this.checkForScaling.cancel()
    window.removeEventListener('resize', this.checkForScaling)
  }

  checkForScaling: Function = debounce(() => {
    const wrapper = document.getElementById(SLIDE_ID)
    const fitsViewport = elementFitsViewport(wrapper)
    const scaleFraction = fitsViewport ? 1 : scaleElementToFit(wrapper)
    const position = fitsViewport ? 'relative' : 'absolute'
    const width = fitsViewport ? 'auto' : 90 / scaleFraction + '%'

    const style = {
      transform: `scale(${scaleFraction})`,
      opacity: 1,
      position,
      width
    }

    this.setState({ style })
  }, 100)

  render () {
    const { content, index, className } = this.props
    const slideClasses = classNames(
      CSS.slide,
      className,
      'regular-slide',
      `slide-${index}`
    )

    return (
      <CSSTransitionGroup
        transitionName='slide'
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear
        component='div'
        className={slideClasses}
        key={`slide-${index}`}
      >
        <div
          id={SLIDE_ID}
          style={{ opacity: 0, ...this.state.style }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CSSTransitionGroup>
    )
  }
}

export default Slide
