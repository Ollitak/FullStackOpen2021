import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'


import { gql, useQuery, useApolloClient } from '@apollo/client'

const ALL_BOOKSANDAUTHORS = gql`
query {
  allBooks {
    title
    published
    author {
      born
      bookCount
      name
      id
    }
    genres
    id
  }
  allAuthors {
    name
    bookCount
    born
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_BOOKSANDAUTHORS)
  const client = useApolloClient()


  if(result.loading){
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button> 
          </span>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
        

      </div>

      <Authors
        show={page === 'authors'} authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App