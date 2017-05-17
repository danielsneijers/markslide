import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from 'reducers'

export const history = createHistory()

const logger = createLogger({
  duration: true,
  collapsed: true
})

let middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  middleware.unshift(logger)
}

const enhancer = applyMiddleware(...middleware)

export function createMainStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    )
  }

  return store
}
