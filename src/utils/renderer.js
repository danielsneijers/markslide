// @flow
import Marked from 'marked'
import Prism, { highlight } from 'prismjs'
import { compose } from 'ramda'
import { colors } from 'config/settings'

export function highlightWithPrism (code: string, lang: string): string {
  require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace')
  const NWPlugin = Prism.plugins.NormalizeWhitespace
  const normalizedCode = NWPlugin.normalize(code, {
    'remove-trailing': false,
    'remove-indent': false,
    'left-trim': false,
    'right-trim': false
  })

  return wrapRowsInSpan(highlight(
    normalizedCode,
    Prism.languages[lang]
  ))
}

export const wrapRowsInSpan = (text: string): string => {
  return text.split(/\n/)
    .map((line) => `<span className='code-row'>${line}</span>\n`)
    .join('')
}

export const enhanceTextWithHeaders = (text: string, level: number = 1): string => {
  return `<h${level}>${text}</h${level}>\n`
}

export const enhanceTextWithParagraph = (text: string): string => {
  return `<p>${text}</p>\n`
}

export const enhanceTextWithColor = (text: string): string => {
  const availableColors = Object.keys(colors)

  return availableColors.reduce((acc, color) => {
    return acc
      .replace(`<${color}>`, `<span style=color:${colors[color]}>`)
      .replace(`</${color}>`, `</span>`)
  }, text)
}

export const enhanceHeaders: string = compose(enhanceTextWithColor, enhanceTextWithHeaders)
export const enhanceParagraphs: string = compose(enhanceTextWithColor, enhanceTextWithParagraph)

const renderer = new Marked.Renderer()
renderer.heading = enhanceHeaders
renderer.paragraph = enhanceParagraphs

Marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: highlightWithPrism
})

export default renderer
