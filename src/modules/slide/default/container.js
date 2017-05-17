// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import type { State, Dispatch } from 'constants/flowTypes'
import { getSlideIndexFromLocation } from 'modules/main/selectors'
import { getCurrentSlide, getSlidesAmount } from '../selectors'
import Slide from './component'
import type { DefaultSlideProps, DefaultSlideMerge } from './types'

export const mapStateToProps = (state: State): DefaultSlideProps => {
  return {
    ...getCurrentSlide(state),
    index: getSlideIndexFromLocation(state),
    totalSlides: getSlidesAmount(state)
  }
}

export const mapDispatchToProps = (dispatch: Function): Dispatch => {
  const actions = { push }

  return bindActionCreators(actions, dispatch)
}

export const mergeProps = (
  stateProps: DefaultSlideProps,
  dispatchProps: Dispatch
): DefaultSlideMerge => {
  const { index, totalSlides } = stateProps

  return {
    ...stateProps,
    nextSlide: () => index < totalSlides && dispatchProps.push(`/${index + 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Slide)
