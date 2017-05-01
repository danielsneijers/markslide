// @flow
import React from 'react'
import classNames from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CSS from './style.css'

type Props = {
  uniqueKey: string,
  content: string,
  className?: string
}

const Slide = ({ content, uniqueKey, className }: Props) => {
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
        className={classNames(CSS.slide, className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CSSTransitionGroup>
  )
}

export default Slide
