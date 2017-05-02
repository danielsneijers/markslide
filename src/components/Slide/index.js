// @flow
import React from 'react'
import classNames from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import CSS from './style.css'

type Props = {
  index: number,
  content: string,
  className?: string
}

const Slide = ({ content, index, className }: Props) => {
  const slideClasses = classNames(
    CSS.slide,
    className,
    'regular-slide',
    `slide${index}`
  )

  return (
    <CSSTransitionGroup
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
      key={`slide-${index}`}
    >
      <div
        className={slideClasses}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CSSTransitionGroup>
  )
}

export default Slide
