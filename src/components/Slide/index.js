// @flow
import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CSS from './style.css'

type Props = {
  key?: string,
  content: string,
  onClick: Function
}

const Slide = ({ content, ...rest }: Props) => {
  return (
    <CSSTransitionGroup
      className={CSS.slide}
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
      {...rest}
    >
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </CSSTransitionGroup>
  )
}

export default Slide
