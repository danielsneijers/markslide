// @flow
import type { Action } from 'constants/flowTypes'
import type { ParsedSlideWithMetaData } from 'utils/markdown'

export default function slides (
  state: Array<ParsedSlideWithMetaData> = [],
  action: Action
) {
  const { type } = action

  switch (type) {
    default:
      return state
  }
}
