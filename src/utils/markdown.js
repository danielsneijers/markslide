import marked from 'marked'
import { compose } from 'ramda'

export function parseSlides (slides) {
  return slides
    .map((slide) => marked(slide))
}

export function splitSlides (content) {
  return content.split('\n---\n')
}

export const parse = compose(parseSlides, splitSlides)
