// @flow
import React, { PureComponent } from 'react'
import { debounce } from 'lodash'
import { elementFitsViewport, scaleElementToFit } from 'utils/viewport'
import CSS from './style.css'

type Props = {
  uniqueKey: string,
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
  props: Props
  state: State

  state = {
    style: {}
  }

  componentDidMount () {
    this.checkForScaling()

    window.addEventListener('resize', this.checkForScaling)
  }

  componentWillReceiveProps () {
    this.checkForScaling()
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this.checkForScaling)
  }

  checkForScaling: Function = debounce(() => {
    const wrapper = document.getElementById(SLIDE_ID)
    const scaleFraction = elementFitsViewport(wrapper) ? 1 : scaleElementToFit(wrapper)
    const width = 90 / scaleFraction

    const style = {
      transform: `scale(${scaleFraction}) translateY(0)`,
      position: 'absolute',
      width: `${width}%`,
      opacity: 1
    }

    this.setState({ style })
  }, 200)

  render (): React$Element<any> {
    const { content, uniqueKey } = this.props

    return (
      <div className={CSS.slide} key={uniqueKey}>
        <div
          id={SLIDE_ID}
          className={CSS.code}
          style={{ opacity: 0, ...this.state.style }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }
}

export default SlideCode
