import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { gql, useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'

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

const FAVORITE_GENRE = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`

const BOOK_ADDED = gql `
subscription {
  bookAdded {
    title
    published
    author {
      name
      bookCount
      born
      id
    }
    genres
    id
  }
}
`

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_BOOKSANDAUTHORS)
  const [getFavGenre, favGenreResult] = useLazyQuery(FAVORITE_GENRE)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKSANDAUTHORS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKSANDAUTHORS,
        data: {
           allBooks : dataInStore.allBooks.concat(addedBook),
           allAuthors : dataInStore.allAuthors
         }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} was just added`)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  if(result.loading){
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  // When recommendation button is pressed, change setpage to recommendations
  // and retreive the users favorite genre from querying for "me".
  // favGenreResult is passed to recommendations component as a props
  const recommendationHandler = () => {
    setPage('recommendations')
    getFavGenre()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={recommendationHandler}>recommendations</button>
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

      <Recommendations
        result = {favGenreResult}
        show={page === 'recommendations'}
        books={result.data.allBooks}
      />

    </div>
  )
}

export default App