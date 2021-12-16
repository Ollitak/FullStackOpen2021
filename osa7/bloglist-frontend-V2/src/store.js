import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

// TBU - reducerit tänne
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})

// Tarvittaessa lisätään thunk tänne myöhemmin (osa 6c - asynkroniset actionit)
const store = createStore(reducer)

export default store
