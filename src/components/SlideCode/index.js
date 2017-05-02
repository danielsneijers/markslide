// @flow
import React, { PureComponent } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
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

const SLIDE_ID: string = 'code-slide-content'

class SlideCode extends PureComponent {
  props: Props
  state: State
  container: HTMLDivElement

  state = {
    style: {}
  }

  componentDidMount () {
    this.checkForScaling()

    window.addEventListener('resize', this.checkForScaling)
  }

  componentWillReceiveProps () {
    this.setState({
      style: {}
    })
    this.checkForScaling()
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this.checkForScaling)
  }

  checkForScaling: Function = debounce(() => {
    const wrapper = this.container
    const scaleFraction = elementFitsViewport(wrapper) ? 1 : scaleElementToFit(wrapper)
    const width = 90 / scaleFraction

    const style = {
      transform: `scale(${scaleFraction})`,
      position: 'absolute',
      width: `${width}%`,
      opacity: 1
    }

    this.setState({ style })
  }, 100)

  render (): React$Element<any> {
    const { content, index, className } = this.props
    const slideClasses = classNames(
      CSS.slide,
      className,
      'code-slide',
      `slide${index}`
    )

    return (
      <div className={slideClasses} key={`slide-${index}`}>
        <div
          id={SLIDE_ID}
          className={CSS.code}
          ref={(c) => { this.container = c }}
          style={{ opacity: 0, ...this.state.style }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    )
  }
}

export default SlideCode
