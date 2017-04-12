import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import SlideContainer from 'containers/SlideContainer'
import CSS from './style.css'

const App = (props) => {
  return (
    <div className={CSS.wrapper}>
      <Switch>
        <Route path='/:slide' component={SlideContainer} />
        <Redirect exact from='/' to='/1' />
      </Switch>
    </div>
  )
}

export default App
