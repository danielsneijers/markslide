import { firstNumberInString } from '../text'

describe('utils/text', () => {
  describe('firstNumberInString', () => {
    it('returns the first number in a string as a string', () => {
      expect(firstNumberInString('/2')).toBe('2')
      expect(firstNumberInString('/6/3')).toBe('6')
      expect(firstNumberInString('/31+21')).toBe('31')
      expect(firstNumberInString('/23?p=21')).toBe('23')
      expect(firstNumberInString('/42?p=21')).toBe('42')
    })

    it('ignores negative values by design', () => {
      expect(firstNumberInString('-2')).toBe('2')
      expect(firstNumberInString('-32')).toBe('32')
    })

    it('returns an empty string by default', () => {
      expect(firstNumberInString()).toBe('')
      expect(firstNumberInString('abc')).toBe('')
      expect(firstNumberInString('@#F')).toBe('')
    })
  })
})
