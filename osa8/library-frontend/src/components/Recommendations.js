import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GENRE_FILTERED_BOOKS = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`
// this component gets a result props, which is a result from the
// favorite genre query
const Recommendations = ({ show, books, result }) => {
  const [getBooks, booksResult] = useLazyQuery(GENRE_FILTERED_BOOKS)
  const [favGenre, setFavGenre] = useState(null)
  
  // This useEffect sets favorite genre to the favGenre hook and
  // is run when favorite genre is retreived
  useEffect(() => {
    if(result.data && result.data.me) {
      setFavGenre(result.data.me.favoriteGenre)
    }
  }, [result.data])

  // This useEffect querys for books corresponding the favorite genre
  // and is run when either books of favGenre changes
  useEffect( () => {
    if(favGenre !== null) {
      getBooks({ variables: { genre: favGenre } })
    }
  }, [favGenre, books]) // eslint-disable-line


  if (!show || !booksResult || !booksResult.data) {
    return null
  }


  return (
    <div>
      <h2> recommendations </h2>
      <table>
        <tbody>
          {booksResult.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations