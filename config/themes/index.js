import { theme } from '../settings'

/**
 * Function that dynamically imports the theme specified in settings.js
 * See https://webpack.js.org/guides/dependency-management/#require-context
 * for more details
 */
export function applyTheme () {
  const context = require.context('.', true, /\.css$/)

  context.keys().forEach(function (key) {
    if (key.includes(theme)) {
      context(key)
    }
  })

  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('!style-loader!css-loader!postcss-loader!../custom.css')
}
