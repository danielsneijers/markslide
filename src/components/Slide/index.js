import React from 'react'
import PropTypes from 'prop-types'

const Slide = ({ content }) => <li dangerouslySetInnerHTML={{ __html: content }} />

Slide.propTypes = {
  content: PropTypes.node
}

export default Slide
