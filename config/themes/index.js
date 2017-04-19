import { theme } from '../settings'

export function applyTheme () {
  const context = require.context('.', true, /\.css$/)

  context.keys().forEach((key) => {
    if (key.includes(theme)) {
      context(key)
    }
  })
}
