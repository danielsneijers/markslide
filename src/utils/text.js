export const firstDigitInString = (text = '') => {
  const matches = text.match(/\d+/)

  return matches && matches.length ? matches[0] : null
}
