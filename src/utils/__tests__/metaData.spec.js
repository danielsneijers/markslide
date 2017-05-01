import {
  findMetaDataInContent,
  convertMetaDataMatchesToMetaObject,
  extractAndConvertMetaData,
  contentWithOutMetaData,
  separateContentAndMetaData
} from '../metaData'

const strings = [
  `{:class custom-class}
   # awesome title`,
  `awesome paragraph
   {:class custom-class}`,
  `{:class custom-class}
   {:loc [1,2]}
   slide with multiple meta`,
  `no metadata`,
  '{foo}'
]

const matches = [
  ['{:class custom-class}'],
  ['{:class custom-class}'],
  ['{:class custom-class}', '{:loc [1,2]}'],
  [],
  []
]

const objects = [
  { class: 'custom-class' },
  { class: 'custom-class' },
  { class: 'custom-class', loc: '[1,2]' },
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
        expect(convertMetaDataMatchesToMetaObject(match)).toEqual(objects[index])
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
})
