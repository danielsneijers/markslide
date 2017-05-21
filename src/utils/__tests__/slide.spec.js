import React from 'react'
import SlideContainer from 'modules/slide/default/container'
import CodeSlideContainer from 'modules/slide/code/container'
import { getSlideType, getSlideComponent } from '../slide'

describe('utils/slide', () => {
  const codeSlide = '<pre><code>console.log(`code`)</code></pre>'
  const defaultSlide = '<h1>Some cool heading</h1>'

  describe('getSlideType', () => {
    it('returns slide type based on content', () => {
      expect(getSlideType('')).toBe('default')
      expect(getSlideType(defaultSlide)).toBe('default')
      expect(getSlideType(codeSlide)).toBe('code')
    })
  })

  describe('getSlideComponent', () => {
    it('returns slide component based on slide type', () => {
      expect(getSlideComponent(codeSlide)).toEqual(<CodeSlideContainer />)
      expect(getSlideComponent(defaultSlide)).toEqual(<SlideContainer />)
    })
  })
})
