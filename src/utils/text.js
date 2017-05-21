// @flow
export const firstNumberInString = (text: string = ''): string => {
  const matches = text.match(/\d+/)

  return matches && matches.length ? matches[0] : ''
}
