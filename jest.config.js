module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/config/', '<rootDir>/src/modules/__fixtures__'],
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^config$': '<rootDir>/config',
    '\\.css$': 'identity-obj-proxy',
    '\\.md$': '<rootDir>/config/__mocks__/slides.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
}
