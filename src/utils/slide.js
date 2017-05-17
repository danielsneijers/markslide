// @flow
import React from 'react'
import { SlideContainer } from 'modules/slide/default'
import { CodeSlideContainer } from 'modules/slide/code'

export const getSlideType = (content: string = ''): string => {
  if (content.includes('<pre><code')) {
    return 'code'
  }

  return 'default'
}

export const getSlideComponent = (content: string): React$Element<any> => {
  switch (getSlideType(content)) {
    case 'code':
      return <CodeSlideContainer />
    default:
      return <SlideContainer />
  }
}
