import React from 'react'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {

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