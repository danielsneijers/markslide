import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import Slide from './components/Slide'

const Routes = () => {
  return (
    <div>
      <Route path='/' component={App} />
      <Route path='/:slide' component={Slide} />
    </div>
  )
}

export default Routes
