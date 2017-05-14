import {
  highlightWithPrism,
  wrapRowsInSpan,
  enhanceTextWithHeaders,
  enhanceTextWithParagraph,
  enhanceTextWithColor
} from '../renderer'

jest.mock('config/settings')

describe('utils/renderer', () => {
  describe('highlightWithPrism', () => {
    it('returns text with indentation', () => {
      const code = 'console.log(\'log\')' + '  console.log(\'with indent\')'
      const parsedCode = "<span class='code-row'>console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'log'</span><span class=\"token punctuation\">)</span>  console<span class=\"token punctuation\">.</span><span class=\"token function\">log</span><span class=\"token punctuation\">(</span><span class=\"token string\">'with indent'</span><span class=\"token punctuation\">)</span></span>\n"

      expect(highlightWithPrism(code, 'javascript')).toBe(parsedCode)
    })
  })

  describe('wrapRowsInSpan', () => {
    it('wraps each newline in a span with highlighting classes', () => {
      const text = 'foo\nbar\nbaz'
      const expectedResult = '<span class=\'code-row\'>foo</span>\n' +
        '<span class=\'code-row\'>bar</span>\n' +
        '<span class=\'code-row\'>baz</span>\n'

      expect(wrapRowsInSpan(text)).toBe(expectedResult)
    })
  })

  describe('enhanceTextWithHeaders', () => {
    const copy = 'Hello World!'

    it('returns string surrounded with correct header tags', () => {
      expect(enhanceTextWithHeaders(copy, 1)).toBe('<h1>Hello World!</h1>\n')
      expect(enhanceTextWithHeaders(copy, 2)).toBe('<h2>Hello World!</h2>\n')
      expect(enhanceTextWithHeaders(copy, 3)).toBe('<h3>Hello World!</h3>\n')
    })

    it('returns h1 tags as a default', () => {
      expect(enhanceTextWithHeaders(copy)).toBe('<h1>Hello World!</h1>\n')
    })
  })

  describe('enhanceTextWithParagraph', () => {
    it('returns string surrounded with p tags', () => {
      const copy = 'Hello World!'

      expect(enhanceTextWithParagraph('')).toBe('<p></p>\n')
      expect(enhanceTextWithParagraph(copy)).toBe('<p>Hello World!</p>\n')
    })
  })

  describe('enhanceTextWithColor', () => {
    it('replaced "<blue>" or "<red>" tags with inline color styles', () => {
      const copyWhite = 'I am <white>not black</white>'
      const copyBlack = 'I am <black>not white</black>'
      const copyBoth = 'I am <white>white</white> and <black>black</black>'

      expect(enhanceTextWithColor(copyWhite)).toBe('I am <span style=color:#FFF>not black</span>')
      expect(enhanceTextWithColor(copyBlack)).toBe('I am <span style=color:#000>not white</span>')
      expect(enhanceTextWithColor(copyBoth)).toBe('I am <span style=color:#FFF>white</span> and <span style=color:#000>black</span>')
    })

    it('doesn\'t parse when color is not in config', () => {
      const copyUndefined = 'I do not <gold>exist</gold>'

      expect(enhanceTextWithColor(copyUndefined)).toBe(copyUndefined)
    })
  })
})
