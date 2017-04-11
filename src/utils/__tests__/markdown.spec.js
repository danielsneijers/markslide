import { splitSlides } from '../markdown'

const exampleMarkdown = `# Title --- just 1 slide!`
const exampleMarkdown2 = `
# Title
Some content
---
## New sheet
- with list
- bullets
- etc
`
const slide1 =
`# Title
Some content`

const slide2 =
`## New sheet
- with list
- bullets
- etc`

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
})
