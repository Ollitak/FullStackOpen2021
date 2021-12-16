import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

// TBU - reducerit tänne
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

// Tarvittaessa lisätään thunk tänne myöhemmin (osa 6c - asynkroniset actionit)
const store = createStore(reducer)

export default store
