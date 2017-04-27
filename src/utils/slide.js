// @flow
import React from 'react'
import Slide from 'components/Slide'
import SlideCode from 'components/SlideCode'

type SlideProps = {
  key: string,
  onClick: Function
}

export const getSlideType = (content: string): string => {
  if (content.includes('<pre><code')) {
    return 'code'
  }

  return 'default'
}

export const getSlide = (content: string, elementProps: SlideProps): React$Element<any> => {
  const { key, onClick } = elementProps

  switch (getSlideType(content)) {
    case 'code':
      return <SlideCode key={key} content={content} onClick={onClick} />
    default:
      return <Slide key={key} content={content} onClick={onClick} />
  }
}
