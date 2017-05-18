// @flow
import { connect } from 'react-redux'
import type { State } from 'constants/flowTypes'
import { getSlidesAmount } from 'modules/slide/selectors'
import { getSlideIndexFromLocation } from 'modules/main/selectors'
import ProgressBar from './component'
import type { ProgressBarProps } from './types'

export function mapStateToProps (state: State): ProgressBarProps {
  const currentIndex = getSlideIndexFromLocation(state)
  const totalSlides = getSlidesAmount(state)

  return {
    offset: (1 - currentIndex / totalSlides) * 100
  }
}

export default connect(mapStateToProps)(ProgressBar)
