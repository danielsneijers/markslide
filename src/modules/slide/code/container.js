// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import type { State, Dispatch } from 'constants/flowTypes'
import { getSlideIndexFromLocation } from 'modules/main/selectors'
import { getCurrentSlide, getSlidesAmount } from '../selectors'
import CodeSlide from './component'
import type { SlideProps, SlideMerge } from '../types'

export function mapStateToProps (state: State): SlideProps {
  return {
    ...getCurrentSlide(state),
    index: getSlideIndexFromLocation(state),
    totalSlides: getSlidesAmount(state)
  }
}

export function mapDispatchToProps (dispatch: Function): Dispatch {
  const actions = { push }

  return bindActionCreators(actions, dispatch)
}

export function mergeProps (
  stateProps: SlideProps,
  dispatchProps: Dispatch
): SlideMerge {
  const { index, totalSlides } = stateProps

  return {
    ...stateProps,
    nextSlide: () => index < totalSlides && dispatchProps.push(`/${index + 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CodeSlide
)
