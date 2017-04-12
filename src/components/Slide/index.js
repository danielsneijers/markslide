import React from 'react'
import PropTypes from 'prop-types'
import CSS from './style.css'

const Slide = ({ content }) => {
  return <li
    className={CSS.item}
    dangerouslySetInnerHTML={{ __html: content }}
  />
}

Slide.propTypes = {
  content: PropTypes.node
}

export default Slide
