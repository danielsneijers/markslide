import React from 'react'
import Slide from 'components/Slide'
import SlideCode from 'components/SlideCode'
import { getSlideType, getSlide } from '../slide'

describe('utils/slide', () => {
  const codeSlide = '<pre><code>console.log(`code`)</code></pre>'
  const defaultSlide = '<h1>Some cool heading</h1>'

  describe('getSlideType', () => {
    test('returns slide type based on content', () => {
      expect(getSlideType('')).toBe('default')
      expect(getSlideType(defaultSlide)).toBe('default')
      expect(getSlideType(codeSlide)).toBe('code')
    })
  })

  describe('getSlide', () => {
    const props = {
      key: 'x',
      content: 'nice copy',
      onClick: () => null
    }

    test('returns slide component based on slide type', () => {
      expect(getSlide(codeSlide, props)).toEqual(<SlideCode {...props} />)
      expect(getSlide(defaultSlide, props)).toEqual(<Slide {...props} />)
    })
  })
})
