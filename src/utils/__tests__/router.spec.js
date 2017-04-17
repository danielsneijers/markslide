import {
  getFromRouterProps,
  getParamFromRouterProps,
  getSlideIndexFromProps
} from '../router'

const withRouterProps = {
  match: {
    params: {
      foo: 'some-text',
      slide: 2
    }
  },
  location: {},
  history: {}
}

describe('utils/router', () => {
  describe('getFromRouterProps', () => {
    test('returns value from router match params', () => {
      expect(getFromRouterProps(withRouterProps, 'foo')).toBe('some-text')
      expect(getFromRouterProps(withRouterProps, 'slide')).toBe(2)
    })

    test('returns nothing if not prop doesn\'t exist', () => {
      expect(getFromRouterProps(withRouterProps, 'baz')).toBeUndefined()
    })
  })

  describe('getParamFromRouterProps', () => {
    test('returns curried getFromRouterProps', () => {
      const curriedGetFromProps = getParamFromRouterProps('foo')

      expect(curriedGetFromProps).toBeInstanceOf(Function)
      expect(curriedGetFromProps(withRouterProps)).toBe('some-text')
      expect(getParamFromRouterProps('slide')(withRouterProps)).toBe(2)
    })
  })

  describe('getSlideIndexFromProps', () => {
    test('returns slide prop from router props', () => {
      expect(getSlideIndexFromProps(withRouterProps)).toBe(2)
    })
  })
})
