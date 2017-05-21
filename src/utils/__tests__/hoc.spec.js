import React, { createElement } from 'react'
import { getDisplayName } from '../hoc'

function TestComponent () {
  return <h1>Foo</h1>
}

describe('utils/hoc', () => {
  describe('getDisplayName', () => {
    it('returns the component display name when found', () => {
      expect(getDisplayName(TestComponent)).toBe('TestComponent')
    })

    it("returns 'Component' by default", () => {
      expect(getDisplayName(createElement('div', null, 'Bar'))).toBe(
        'Component'
      )
    })
  })
})
