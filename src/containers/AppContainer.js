// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getSlideComponent } from 'utils/slide'
import { getCurrentSlideContent, getSlidesAmount } from 'selectors/slide'
import { getSlideIndexFromLocation } from 'selectors/routing'
import App from 'components/App'

export const mapStateToProps = state => {
  const slideContent = getCurrentSlideContent(state)
  const routeContainer = getSlideComponent(slideContent)

  return {
    routeContainer,
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
    nextSlide: () => index < totalSlides && dispatchProps.push(`/${index + 1}`),
    previousSlide: () => index > 1 && dispatchProps.push(`/${index - 1}`)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
