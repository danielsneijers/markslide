// @flow
import React from 'react'
import Slide from 'components/Slide'
import SlideCode from 'components/SlideCode'

type SlideTypes = React$Element<Slide> | React$Element<SlideCode>
type SlideProps = {
  key: string,
  content: string,
  onClick: Function
}

export const getSlideType = (content: string): string => {
  if (content.includes('<pre><code')) {
    return 'code'
  }

  return 'default'
}

export const getSlide = (content: string, props: SlideProps): SlideTypes => {
  switch (getSlideType(content)) {
    case 'code':
      return <SlideCode {...props} />
    default:
      return <Slide {...props} />
  }
}
