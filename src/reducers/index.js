import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import slide from './slide'

const rootReducer = combineReducers({
  slide,
  routing
})

export default rootReducer
