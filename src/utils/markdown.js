import marked from 'marked'
import { compose } from 'ramda'
// import React from 'react'
// import Slide from '../components/Slide'

export function parseSlides (slides) {
  return slides
    .map((slide) => marked(slide))
    // .map((slideHtml, index) => <Slide content={slideHtml} key={`slide-${index}`} />)
}

export function splitSlides (content) {
  return content.split('\n---\n')
}

export const parse = compose(parseSlides, splitSlides)
