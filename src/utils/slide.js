// @flow
import React from 'react'
import SlideContainer from 'containers/SlideContainer'
import SlideCodeContainer from 'containers/SlideCodeContainer'

export const getSlideType = (content: string = ''): string => {
  if (content.includes('<pre><code')) {
    return 'code'
  }

  return 'default'
}

export const getSlideComponent = (content: string): React$Element<any> => {
  switch (getSlideType(content)) {
    case 'code':
      return <SlideCodeContainer />
    default:
      return <SlideContainer />
  }
}
