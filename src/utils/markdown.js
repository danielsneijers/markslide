import marked from 'marked'
import { memoize, compose } from 'ramda'

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

export const splitSlides = memoize((content) => content.split('\n---\n'))
export const slidesCount = memoize((content) => splitSlides(content).length)
export const parseSlides = memoize((slides) =>
  slides.map((slide) =>
    marked(slide)))

export const parse = compose(parseSlides, splitSlides)
