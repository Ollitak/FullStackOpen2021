import anecdoteReducer,  { initialize } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  })

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(a => {
  store.dispatch(initialize(a))
})

export default store