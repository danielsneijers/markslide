// @flow
import React, { Component } from 'react'
import { KEY_CODES } from 'constants'
import { getDisplayName } from 'utils/hoc'

const fullScreenOption = (WrappedComponent: any) => {
  class FullScreenOption extends Component<any, any, any> {
    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnMount () {
      window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === KEY_CODES.F) {
        const root: HTMLDivElement = window.document.getElementById('root')

        this.enterFullScreen(root)
      }
    };

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
      return <WrappedComponent {...this.props} />
    }
  }

  FullScreenOption.displayName = `FullScreenOption(${getDisplayName(WrappedComponent)})`

  return FullScreenOption
}

export default fullScreenOption
