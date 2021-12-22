import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const FAVORITE_GENRE = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`

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

const Recommendations = ({ show, books }) => {
  const [getFavGenre, result] = useLazyQuery(FAVORITE_GENRE)
  const [getBooks, booksResult] = useLazyQuery(GENRE_FILTERED_BOOKS)
  const [favGenre, setFavGenre] = useState(null)
  
  // tallennetaan me-data favGenre-tilaan
  useEffect(() => {
    if(result.data && result.data.me) {
      setFavGenre(result.data.me.favoriteGenre)
    }
  }, [result.data])

  // haetaan erillisellä pyynnöllä favGenren mukaiset datat.
  // tiedot päivitetään jos favGenre muuttuu tai jos 
  // kirjoja ilmestyy lisää
  useEffect( () => {
    console.log(favGenre)
    if(favGenre !== null) {
      getBooks({ variables: { genre: favGenre } })
    }
  }, [favGenre, books]) // eslint-disable-line


  if (!show) {
    return null
  }
  
  // haetaan me-data kun nappia painetaan
  const handler = async () => {
    await getFavGenre()
  }
  console.log(booksResult)

  if(booksResult && booksResult.data){
    return (
      <div>
        <div>
          <button onClick={handler}> update my recommendations </button>
        </div>
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
  
  return (
    <div>
      <button onClick={handler}> update my recommendations </button>
    </div>
  )
}

export default Recommendations