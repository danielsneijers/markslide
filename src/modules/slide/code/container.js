// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getSlideIndexFromLocation } from 'modules/main/selectors'
import { getCurrentSlide } from '../selectors'
import CodeSlide from './component'

export function mapStateToProps (state) {
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
  CodeSlide
)
