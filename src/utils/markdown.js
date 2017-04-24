// @flow
import Marked from 'marked'
import { compose } from 'ramda'
import renderer from 'utils/renderer'

export const splitSlides = (content: string): Array<string> =>
  content.split('\n---\n')

export const slidesCount = (content: string): number =>
  splitSlides(content).length

export const parseSlides = (slides: Array<string>): Array<HTMLElement> =>
  slides.map((slide: string) =>
    Marked(slide, { renderer }))

export const parse = compose(parseSlides, splitSlides)
