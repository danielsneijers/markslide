import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

const tree = (Component, Router) => (
  <AppContainer>
    <Router>
      <Component />
    </Router>
  </AppContainer>
)

const render = (Component, Router) => {
  ReactDOM.render(tree(Component, Router), document.getElementById('root'))
}

render(App, BrowserRouter)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App, BrowserRouter)
  })
}
