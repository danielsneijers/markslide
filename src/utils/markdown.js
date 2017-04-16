import marked from 'marked'
import { memoize, compose } from 'ramda'

export const parseSlides = memoize((slides) =>
  slides.map((slide) =>
    marked(slide)))

export const splitSlides = memoize((content) => content.split('\n---\n'))
export const slidesCount = memoize((content) => splitSlides(content).length)

export const parse = compose(parseSlides, splitSlides)
