// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getCurrentSlide, getSlidesAmount } from 'selectors/slide'
import { getSlideIndexFromLocation } from 'selectors/routing'
import Slide from 'components/Slide'

export function mapStateToProps (state) {
  return {
    ...getCurrentSlide(state),
    index: getSlideIndexFromLocation(state),
    totalSlides: getSlidesAmount(state)
  }
}

export function mapDispatchToProps (dispatch) {
  const actions = { push }

  return bindActionCreators(actions, dispatch)
}

export function mergeProps (stateProps, dispatchProps) {
  const { index, totalSlides } = stateProps

  return {
    ...stateProps,
    nextSlide: () => index < totalSlides && dispatchProps.push(`/${index + 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Slide)
