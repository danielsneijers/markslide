import React from 'react'
import PropTypes from 'prop-types'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import CSS from './style.css'

const App = ({ content }) => {
  return (
    <div className={CSS.wrapper}>
      body
      {content}
    </div>
  )
}

App.propTypes = {
  content: PropTypes.array
}

export default App
