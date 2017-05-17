// @flow
import React from 'react'
import { compose } from 'ramda'
import classNames from 'classnames'
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

const CodeSlide = ({ content, index, meta, style, nextSlide }: Props) => {
  const slideClasses = classNames(
    CSS.slide,
    meta.class,
    'code-slide',
    `slide-${index}`
  )

  return (
    <div className={slideClasses} key={`slide-${index}`}>
      <div
        id={`slide-${index}`}
        key={Math.random()}
        className={CSS.code}
        style={{ opacity: 0, ...style }}
        onClick={nextSlide}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

const enhance = compose(fullScreenOption, autoScaleContent)

export default enhance(CodeSlide)
