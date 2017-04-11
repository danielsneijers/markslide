import React from 'react'
import PropTypes from 'prop-types'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'
import content from '../../../sheets.md'
import CSS from './style.css'

const App = ({ children }) => {
  console.log(content)

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
