// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import slide from 'modules/slide/reducer'

const rootReducer = combineReducers({
  slide,
  routing
})

export default rootReducer
