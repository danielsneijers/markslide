// @flow
import { createSelector } from 'reselect'
import type { State } from 'constants/flowTypes'
import { firstDigitInString } from 'utils/text'

export const getCurrentPath = (state: State): string =>
  state.routing.location.pathname

export const getSlideIndexFromLocation = createSelector(
  [getCurrentPath],
  (path: string): number => parseInt(firstDigitInString(path))
)
