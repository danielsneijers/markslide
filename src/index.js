import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import Routes from './routes'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    let nextRoutes = require('./routes')
    render(nextRoutes)
  })
}
