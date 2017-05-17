// @flow
import React from 'react'
import { compose } from 'ramda'
import classNames from 'classnames'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { fullScreenOption, autoScaleContent } from 'higher-order-components'
import CSS from './style.css'

type Props = {
  index: number,
  content: string,
  meta: {
    class?: string // eslint-disable-line react/no-unused-prop-types
  },
  nextSlide: Function,
  style: {}
};

const Slide = ({ content, index, nextSlide, meta, style }: Props) => {
  const slideClasses = classNames(
    CSS.slide,
    meta.class,
    'regular-slide',
    `slide-${index}`
  )

  return (
    <CSSTransitionGroup
      transitionName='slide'
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      transitionAppear
      component='div'
      className={slideClasses}
      key={`slide-${index}`}
      onClick={nextSlide}
    >
      <div
        id={`slide-${index}`}
        style={{ opacity: 0, ...style }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </CSSTransitionGroup>
  )
}

const enhance = compose(fullScreenOption, autoScaleContent)

export default enhance(Slide)
