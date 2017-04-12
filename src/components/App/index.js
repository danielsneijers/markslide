import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router'
import { getParamFromRouterProps } from 'utils/router'
import content from '../../../sheets.md'
import Slide from '../Slide'
import CSS from './style.css'

const App = (props) => {
  const extractSlideParam = getParamFromRouterProps('slide')

  return (
    <div className={CSS.wrapper}>
      App
      <Switch>
        <Route
          path='/:slide'
          render={(props) => <Slide index={parseInt(extractSlideParam(props)) || 1} />}
        />
        <Redirect exact from='/' to='/1' />
      </Switch>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.array
}

export default App
