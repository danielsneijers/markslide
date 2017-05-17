import { createSelector } from 'reselect'
import { get } from 'lodash'
import { getSlideIndexFromLocation } from 'modules/main/selectors'

export const getSlides = state => get(state, 'slide.all', [])
export const getSlidesAmount = state => state.slide.all.length

export const getCurrentSlide = createSelector(
  [getSlides, getSlideIndexFromLocation],
  (slides, current) => slides[current - 1]
)

export const getCurrentSlideContent = createSelector(
  [getCurrentSlide],
  current => current && current.content
)
