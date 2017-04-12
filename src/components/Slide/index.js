import React from 'react'
import PropTypes from 'prop-types'
import CSS from './style.css'

const Slide = ({ index }) => {
  console.log(index)
  return <li className={CSS.item}>slides</li>
}

Slide.propTypes = {
  index: PropTypes.number
}

export default Slide
