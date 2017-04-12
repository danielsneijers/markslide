import React from 'react'
import PropTypes from 'prop-types'
import CSS from './style.css'

const Slide = ({ content, ...rest }) => {
  return (
    <div className={CSS.slide} {...rest}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

Slide.propTypes = {
  content: PropTypes.node
}

export default Slide
