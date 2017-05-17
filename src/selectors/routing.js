import { createSelector } from 'reselect'
import { firstDigitInString } from 'utils/text'

export const getCurrentPath = state => state.routing.location.pathname

export const getSlideIndexFromLocation = createSelector(
  [getCurrentPath],
  path => parseInt(firstDigitInString(path))
)
