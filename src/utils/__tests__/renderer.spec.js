import {
  highlightWithPrism,
  enhanceTextWithHeaders,
  enhanceTextWithParagraph,
  enhanceTextWithColor
} from '../renderer'

jest.mock('config/settings')

describe('utils/renderer', () => {
  describe('highlightWithPrism', () => {
    test('returns text with indentation', () => {
      const code = 'console.log(\'log\')' + '  console.log(\'with indent\')'
      const parsedCode = "console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'log'</span><span class=\"token punctuation\">)</span>  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'with indent'</span><span class=\"token punctuation\">)</span>"

      expect(highlightWithPrism(code, 'javascript')).toBe(parsedCode)
    })
  })

  describe('enhanceTextWithHeaders', () => {
    const copy = 'Hello World!'

    test('returns string surrounded with correct header tags', () => {
      expect(enhanceTextWithHeaders(copy, 1)).toBe('<h1>Hello World!</h1>\n')
      expect(enhanceTextWithHeaders(copy, 2)).toBe('<h2>Hello World!</h2>\n')
      expect(enhanceTextWithHeaders(copy, 3)).toBe('<h3>Hello World!</h3>\n')
    })

    test('returns h1 tags as a default', () => {
      expect(enhanceTextWithHeaders(copy)).toBe('<h1>Hello World!</h1>\n')
    })
  })

  describe('enhanceTextWithParagraph', () => {
    test('returns string surrounded with p tags', () => {
      const copy = 'Hello World!'

      expect(enhanceTextWithParagraph('')).toBe('<p></p>\n')
      expect(enhanceTextWithParagraph(copy)).toBe('<p>Hello World!</p>\n')
    })
  })

  describe('enhanceTextWithColor', () => {
    test('replaced "<blue>" or "<red>" tags with inline color styles', () => {
      const copyWhite = 'I am <white>not black</white>'
      const copyBlack = 'I am <black>not white</black>'
      const copyBoth = 'I am <white>white</white> and <black>black</black>'

      expect(enhanceTextWithColor(copyWhite)).toBe('I am <span style=color:#FFF>not black</span>')
      expect(enhanceTextWithColor(copyBlack)).toBe('I am <span style=color:#000>not white</span>')
      expect(enhanceTextWithColor(copyBoth)).toBe('I am <span style=color:#FFF>white</span> and <span style=color:#000>black</span>')
    })

    test('doesn\'t parse when color is not in config', () => {
      const copyUndefined = 'I do not <gold>exist</gold>'

      expect(enhanceTextWithColor(copyUndefined)).toBe(copyUndefined)
    })
  })
})
