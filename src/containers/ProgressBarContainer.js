// @flow
import { connect } from 'react-redux'
import { getSlidesAmount } from 'selectors/slide'
import { getSlideIndexFromLocation } from 'selectors/routing'
import ProgressBar from 'components/ProgressBar'

export function mapStateToProps (state) {
  const currentIndex = getSlideIndexFromLocation(state)
  const totalSlides = getSlidesAmount(state)

  return {
    offset: (1 - currentIndex / totalSlides) * 100
  }
}

export default connect(mapStateToProps)(ProgressBar)
