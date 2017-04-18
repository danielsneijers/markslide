import React from 'react'
import PropTypes from 'prop-types'
import CSS from './style.css'

const ProgressBar = ({ offset }) => {
  const style = { transform: `translateX(-${offset}%)` }

  return <span className={CSS.progressBar} style={style} />
}

ProgressBar.propTypes = {
  offset: PropTypes.number.isRequired
}

export default ProgressBar
