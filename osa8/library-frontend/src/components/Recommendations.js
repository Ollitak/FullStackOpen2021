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

const Recommendations = ({ show, books }) => {
  const [getFavGenre, result] = useLazyQuery(FAVORITE_GENRE)
  const [favGenre, setFavGenre] = useState(null)
  
  useEffect(() => {
    if(result.data && result.data.me) {
      setFavGenre(result.data.me.favoriteGenre)
    }
  }, [result.data])


  if (!show) {
    return null
  }
  
  const handler = async () => {
    await getFavGenre()
  }

  let filteredBooks = []
  if(favGenre != null) {
    filteredBooks = books.filter(b => b.genres.includes(favGenre))
  }

  return (
    <div>
      <div>
        <button onClick={handler}> update my recommendations </button>
      </div>
      <h2> recommendations </h2>
      <table>
        <tbody>
          {filteredBooks.map(a =>
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