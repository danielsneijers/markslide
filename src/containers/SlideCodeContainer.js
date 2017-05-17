// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getCurrentSlide } from 'selectors/slide'
import { getSlideIndexFromLocation } from 'selectors/routing'
import SlideCode from 'components/SlideCode'

export function mapStateToProps (state) {
  console.log(state)
  return {
    ...getCurrentSlide(state),
    index: getSlideIndexFromLocation(state)
  }
}

export function mapDispatchToProps (dispatch) {
  const actions = { push }

  return bindActionCreators(actions, dispatch)
}

export function mergeProps (stateProps, dispatchProps) {
  return {
    ...stateProps,
    nextSlide: () => dispatchProps.push(`/${stateProps.index + 1}`),
    previousSlide: () => dispatchProps.push(`/${stateProps.index - 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SlideCode
)
