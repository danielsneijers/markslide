// @flow
import marked from 'marked'
import { compose } from 'ramda'

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

export const splitSlides = (content: string): Array<string> =>
  content.split('\n---\n')

export const slidesCount = (content: string): number =>
  splitSlides(content).length

export const parseSlides = (slides: Array<string>): Array<HTMLElement> =>
  slides.map((slide: string) =>
    marked(slide))

export const parse = compose(parseSlides, splitSlides)
