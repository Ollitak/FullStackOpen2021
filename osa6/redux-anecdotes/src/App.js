import React, {useEffect} from 'react'
import { initialize } from './reducers/anecdoteReducer'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()


useEffect(() => {
  dispatch(initialize())
}, [dispatch])
  

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdotesList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App