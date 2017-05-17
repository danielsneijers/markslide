// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import type { State, Dispatch } from 'constants/flowTypes'
import { getSlideComponent } from 'utils/slide'
import {
  getCurrentSlideContent,
  getSlidesAmount
} from 'modules/slide/selectors'
import { getSlideIndexFromLocation } from './selectors'
import Main from './component'
import type { MainProps, MainMerge } from './types'

export const mapStateToProps = (state: State): MainProps => {
  const slideContent = getCurrentSlideContent(state)
  const routeContainer = getSlideComponent(slideContent)

  return {
    routeContainer,
    index: getSlideIndexFromLocation(state),
    totalSlides: getSlidesAmount(state)
  }
}

export function mapDispatchToProps (dispatch: Function): Dispatch {
  const actions = { push }

  return bindActionCreators(actions, dispatch)
}

export function mergeProps (
  stateProps: MainProps,
  dispatchProps: Dispatch
): MainMerge {
  const { index, totalSlides } = stateProps

  return {
    ...stateProps,
    nextSlide: () => index < totalSlides && dispatchProps.push(`/${index + 1}`),
    previousSlide: () => index > 1 && dispatchProps.push(`/${index - 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main)
