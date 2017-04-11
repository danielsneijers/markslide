import React from 'react'
import PropTypes from 'prop-types'

const App = ({ children }) => <ul>{children}</ul>

App.propTypes = {
  children: PropTypes.node
}

export default App
