import {
  splitSlides,
  slidesCount,
  parseSlideObjectsToHtml,
  parseSlidesToEnhancedObjects,
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
const slides = [
  `# Title
Some content`,
  `## New slide
- with list
- bullets
- etc`
]

const html = [
  '<h1>Title</h1>\n' +
  '<p>Some content</p>\n',
  '<h2>New slide</h2>\n' +
  '<ul>\n' +
  '<li>with list</li>\n' +
  '<li>bullets</li>\n' +
  '<li>etc</li>\n' +
  '</ul>\n'
]

describe('utils/markdown', () => {
  describe('splitSlides', () => {
    it('splits markdown by markdown HRs ("---")', () => {
      const parsedContent = splitSlides(exampleMarkdown)

      expect(parsedContent.length).toBe(1)
      expect(parsedContent[0]).toEqual(exampleMarkdown)

      const parsedContent2 = splitSlides(exampleMarkdown2)

      expect(parsedContent2.length).toBe(2)
      expect(parsedContent2[0]).toEqual(expect.stringContaining(slides[0]))
      expect(parsedContent2[1]).toEqual(expect.stringContaining(slides[1]))
    })
  })

  describe('slidesCount', () => {
    it('returns amount of slides in presentation', () => {
      expect(slidesCount(exampleMarkdown)).toBe(1)
      expect(slidesCount(exampleMarkdown2)).toBe(2)
    })
  })

  describe('parseSlidesToEnhancedObjects', () => {
    it('converts map of markdown elements to slide objects', () => {
      const slides = splitSlides(exampleMarkdown2)
      const result = parseSlidesToEnhancedObjects(slides)

      expect(result.length).toBe(slides.length)

      result.forEach(({ content, meta }, index) => {
        expect(content).toEqual(slides[index])
        expect(meta).toEqual({})
      })
    })
  })

  describe('parseSlideObjectsToHtml', () => {
    it('converts map slide objects to html slides with meta data', () => {
      const slides = parseSlidesToEnhancedObjects(splitSlides(exampleMarkdown2))
      const result = parseSlideObjectsToHtml(slides)

      expect(result.length).toBe(html.length)

      result.forEach(({ content, meta }, index) => {
        expect(content).toEqual(html[index])
        expect(meta).toEqual({})
      })
    })
  })

  describe('parse', () => {
    it('converts raw markdown to html elements', () => {
      const result = parse(exampleMarkdown2)

      expect(result.length).toBe(html.length)

      result.forEach(({ content, meta }, index) => {
        expect(content).toEqual(html[index])
        expect(meta).toEqual({})
      })
    })
  })
})
