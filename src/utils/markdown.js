// @flow
import Marked from 'marked'
import { compose } from 'ramda'
import { separateContentAndMetaData } from 'utils/metaData'
import type { SlideWithMetaData } from 'utils/metaData'
import renderer from 'utils/renderer'

type ParsedSlideWithMetaData = {
  content: HTMLElement,
  meta: {}
}

export const splitSlides = (content: string): Array<string> =>
  content.split('\n---\n')

export const slidesCount = (content: string): number =>
  splitSlides(content).length

export const parseSlidesToEnhancedObjects = (
  slides: Array<string>
): Array<SlideWithMetaData> => slides.map(separateContentAndMetaData)

export const parseSlideObjectsToHtml = (
  slides: Array<SlideWithMetaData>
): Array<ParsedSlideWithMetaData> =>
  slides.map(({ content, meta }: SlideWithMetaData) => {
    return { content: Marked(content, { renderer }), meta }
  })

export const parse: Function = compose(
  parseSlideObjectsToHtml,
  parseSlidesToEnhancedObjects,
  splitSlides
)
