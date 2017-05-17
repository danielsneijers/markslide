// @flow
import { createSelector } from 'reselect'
import type { State } from 'constants/flowTypes'
import type { ParsedSlideWithMetaData } from 'utils/markdown'
import { getSlideIndexFromLocation } from 'modules/main/selectors'

export const getSlides = (state: State): Array<ParsedSlideWithMetaData> =>
  state.slide.all
export const getSlidesAmount = (state: State): number => state.slide.all.length

export const getCurrentSlide = createSelector(
  [getSlides, getSlideIndexFromLocation],
  (
    slides: Array<ParsedSlideWithMetaData>,
    current: number
  ): ParsedSlideWithMetaData => slides[current - 1]
)

export const getCurrentSlideContent = createSelector(
  [getCurrentSlide],
  (current: ParsedSlideWithMetaData): HTMLElement => current && current.content
)
