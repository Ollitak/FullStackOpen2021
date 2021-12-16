import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'

// TBU - reducerit tänne
const reducer = combineReducers({
  notification: notificationReducer
})

// Tarvittaessa lisätään thunk tänne myöhemmin (osa 6c - asynkroniset actionit)
const store = createStore(reducer)

export default store
