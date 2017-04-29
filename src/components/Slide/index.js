// @flow
import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CSS from './style.css'

type Props = {
  uniqueKey: string,
  content: string
}

const Slide = ({ content, uniqueKey }: Props) => {
  return (
    <CSSTransitionGroup
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
      key={uniqueKey}
    >
      <div
        className={CSS.slide}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CSSTransitionGroup>
  )
}

export default Slide
