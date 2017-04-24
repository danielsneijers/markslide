// @flow
import React, { PureComponent } from 'react'
// import { debounce } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { elementFitsViewport, scaleElementToFit } from 'utils/viewport'
import CSS from './style.css'

type SlideCodeProps = {
  content: string
}

type State = {
  style: {
    transform?: string,
    position?: string,
    width?: string
  }
}

const SLIDE_ID: string = 'code-slide-content'

class SlideCode extends PureComponent {
  props: SlideCodeProps
  state: State

  constructor (props: SlideCodeProps) {
    super(props)

    // this.checkForScaling = debounce(this.checkForScaling, 200)
    this.state = { style: {} }
  }

  componentDidMount () {
    this.checkForScaling()

    window.addEventListener('resize', this.checkForScaling)
  }

  componentWillReceiveProps () {
    this.checkForScaling()
  }

  checkForScaling = () => {
    setTimeout(() => {
      const wrapper = document.getElementById(SLIDE_ID)
      const scaleFraction = elementFitsViewport(wrapper) ? 1 : scaleElementToFit(wrapper)
      const width = 90 / scaleFraction

      const style = {
        transform: `scale(${scaleFraction})`,
        position: 'absolute',
        width: `${width}%`
      }

      this.setState({ style })
    }, 200)
  }

  render (): React$Element<any> {
    const { content } = this.props

    return (
      <CSSTransitionGroup
        className={CSS.slide}
        transitionName='slide'
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear
        component='div'
      >
        <div
          id={SLIDE_ID}
          style={{ ...this.state.style }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CSSTransitionGroup>
    )
  }
}

export default SlideCode
