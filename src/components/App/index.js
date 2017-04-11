import React from 'react'
import PropTypes from 'prop-types'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import CSS from './style.css'

const App = ({ children }) => {
  return (
    <div className={CSS.wrapper}>
      App
    </div>
  )
}

App.propTypes = {
  children: PropTypes.array
}

export default App
