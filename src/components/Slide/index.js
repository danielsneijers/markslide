import React from 'react'
import PropTypes from 'prop-types'

const Slide = ({ match }) => {
  console.log(match)
  return <li>slide</li>
}

Slide.propTypes = {
  match: PropTypes.object
}

export default Slide
