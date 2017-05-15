import {
  findMetaDataInContent,
  convertMetaDataMatchesToMetaObject,
  extractAndConvertMetaData,
  contentWithOutMetaData,
  separateContentAndMetaData,
  parseLocFromMetaData
} from '../metaData'

const strings = [
  `{:class custom-class}
   # awesome title`,
  `awesome paragraph
   {:class custom-class}`,
  `{:class custom-class}
   {:loc [1,2], [34,36]}
   slide with multiple meta`,
  `no metadata`,
  '{foo}'
]

const matches = [
  ['{:class custom-class}'],
  ['{:class custom-class}'],
  ['{:class custom-class}', '{:loc [1,2], [34,36]}'],
  [],
  []
]

const objects = [
  { class: 'custom-class' },
  { class: 'custom-class' },
  { class: 'custom-class', loc: '[1,2], [34,36]' },
  {},
  {}
]

const content = [
  '# awesome title',
  'awesome paragraph',
  'slide with multiple meta',
  'no metadata',
  '{foo}'
]

describe('utils/metaData', () => {
  describe('findMetaDataInContent', () => {
    it('returns an array {:key value} meta data from a string', () => {
      strings.forEach((string, index) => {
        expect(findMetaDataInContent(string)).toEqual(matches[index])
      })
    })
  })

  describe('convertMetaDataMatchesToMetaObject', () => {
    it('returns javascript objects from parsed meta data strings', () => {
      matches.forEach((match, index) => {
        expect(convertMetaDataMatchesToMetaObject(match)).toEqual(
          objects[index]
        )
      })
    })
  })

  describe('extractAndConvertMetaData', () => {
    it('returns javascript objects from a string', () => {
      strings.forEach((string, index) => {
        expect(extractAndConvertMetaData(string)).toEqual(objects[index])
      })
    })
  })

  describe('contentWithOutMetaData', () => {
    it('returns clean content from a string', () => {
      strings.forEach((string, index) => {
        expect(contentWithOutMetaData(string)).toEqual(content[index])
      })
    })
  })

  describe('separateContentAndMetaData', () => {
    it('returns { content, meta } objects from a string', () => {
      strings.forEach((string, index) => {
        const expectedResult = {
          content: content[index],
          meta: objects[index]
        }

        expect(separateContentAndMetaData(string)).toEqual(expectedResult)
      })
    })
  })

  describe('parseLocFromMetaData', () => {
    it('converts loc meta data from string to array of numbers', () => {
      const expectedResult = { loc: [[1, 2], [34, 36]] }

      expect(parseLocFromMetaData(objects[2])).toEqual(expectedResult)
    })

    it('returns an empty object when no loc metadata is present', () => {
      expect(parseLocFromMetaData(objects[0])).toEqual({})
      expect(parseLocFromMetaData(objects[1])).toEqual({})
      expect(parseLocFromMetaData(objects[3])).toEqual({})
      expect(parseLocFromMetaData(objects[4])).toEqual({})
    })

    it('returns an empty object when no valid JSON is present', () => {
      const invalidData = [
        { loc: '[1,..2], [34,36]' },
        { loc: '{[1,2], [34,36]' },
        { loc: '1,2**, #34,36' }
      ]

      invalidData.forEach(input => {
        expect(parseLocFromMetaData(input)).toEqual({})
      })
    })
  })
})
