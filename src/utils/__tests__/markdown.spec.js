import {
  splitSlides,
  slidesCount,
  parseSlides,
  parse
} from '../markdown'

const exampleMarkdown = `# Title --- just 1 slide!`
const exampleMarkdown2 = `
# Title
Some content
---
## New slide
- with list
- bullets
- etc
`
const slide1 =
`# Title
Some content`
const slide2 =
`## New slide
- with list
- bullets
- etc`
const html = [
  '<h1 id="title">Title</h1>\n' +
  '<p>Some content</p>\n',
  '<h2 id="new-slide">New slide</h2>\n' +
  '<ul>\n' +
  '<li>with list</li>\n' +
  '<li>bullets</li>\n' +
  '<li>etc</li>\n' +
  '</ul>\n'
]

describe('utils/markdown', () => {
  describe('splitSlides', () => {
    test('splits markdown by markdown HRs ("---")', () => {
      const parsedContent = splitSlides(exampleMarkdown)

      expect(parsedContent.length).toBe(1)
      expect(parsedContent[0]).toEqual(exampleMarkdown)

      const parsedContent2 = splitSlides(exampleMarkdown2)

      expect(parsedContent2.length).toBe(2)
      expect(parsedContent2[0]).toEqual(expect.stringContaining(slide1))
      expect(parsedContent2[1]).toEqual(expect.stringContaining(slide2))
    })
  })

  describe('slidesCount', () => {
    test('returns amount of slides in presentation', () => {
      expect(slidesCount(exampleMarkdown)).toBe(1)
      expect(slidesCount(exampleMarkdown2)).toBe(2)
    })
  })

  describe('parseSlides', () => {
    test('converts map of markdown elements to html slides', () => {
      const slides = splitSlides(exampleMarkdown2)

      expect(parseSlides(slides)).toEqual(html)
    })
  })

  describe('parse', () => {
    test('converts raw markdown to html elements', () => {
      expect(parse(exampleMarkdown2)).toEqual(html)
    })
  })
})
