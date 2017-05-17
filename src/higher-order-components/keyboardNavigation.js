// @flow
import React, { Component } from 'react'
import { KEY_CODES } from 'constants'
import { getDisplayName } from 'utils/hoc'

type Props = {
  nextSlide: Function,
  previousSlide: Function
};

const keyboardNavigation = (WrappedComponent: any) => {
  class KeyboardNavigation extends Component<any, Props, any> {
    props: Props;

    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnMount () {
      window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e: KeyboardEvent) => {
      const { nextSlide, previousSlide } = this.props

      switch (e.keyCode) {
        case KEY_CODES.LEFT:
        case KEY_CODES.UP:
          previousSlide()
          break
        case KEY_CODES.RIGHT:
        case KEY_CODES.DOWN:
          nextSlide()
          break
      }
    };

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  KeyboardNavigation.displayName = `KeyboardNavigation(${getDisplayName(WrappedComponent)})`

  return KeyboardNavigation
}

export default keyboardNavigation
