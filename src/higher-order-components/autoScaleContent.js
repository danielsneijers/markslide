// @flow
import React, { Component } from 'react'
import { debounce } from 'lodash'
import { getDisplayName } from 'utils/hoc'
import { elementFitsViewport, scaleElementToFit } from 'utils/viewport'

type State = {
  style: {
    transform?: string,
    position?: string,
    width?: string
  }
};

type Props = {
  index: number
};

const autoScaleContent = (WrappedComponent: any) => {
  class AutoScaleContent extends Component<any, Props, State> {
    props: Props;
    initialState = { style: {} };
    state: State = this.initialState;

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
      const { index } = this.props
      const wrapper = document.getElementById(`slide-${index}`)
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
    }, 200);

    render () {
      return <WrappedComponent {...this.props} style={this.state.style} />
    }
  }

  AutoScaleContent.displayName = `AutoScaleContent(${getDisplayName(WrappedComponent)})`

  return AutoScaleContent
}

export default autoScaleContent
