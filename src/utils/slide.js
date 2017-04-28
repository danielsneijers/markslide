// @flow
import React from 'react'
import Slide from 'components/Slide'
import SlideCode from 'components/SlideCode'

type SlideProps = {
  uniqueKey: string
}

export const getSlideType = (content: string): string => {
  if (content.includes('<pre><code')) {
    return 'code'
  }

  return 'default'
}

export const getSlide = (content: string, elementProps: SlideProps): React$Element<any> => {
  const props = { ...elementProps, content }

  switch (getSlideType(content)) {
    case 'code':
      return <SlideCode {...props} />
    default:
      return <Slide {...props} />
  }
}
