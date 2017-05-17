// @flow
export const firstDigitInString = (text: string = ''): string => {
  const matches = text.match(/\d+/)

  return matches && matches.length ? matches[0] : ''
}
