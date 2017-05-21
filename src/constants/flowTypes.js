// @flow
import type { ParsedSlideWithMetaData } from 'utils/markdown'

export type State = {
  +slide: {
    +all: Array<ParsedSlideWithMetaData>
  },
  +routing: {
    +location: {
      +pathname: string
    }
  }
};

export type Dispatch = {
  +[name: string]: Function
};

export type Action = {
  type: string,
  payload?: any
};
