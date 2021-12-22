import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'


const GENRE_FILTERED_BOOKS2 = gql`
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


const Books = (props) => {
  const [books, setBooks] = useState(props.books)
  const [getBooks, booksResult] = useLazyQuery(GENRE_FILTERED_BOOKS2)
  

  const allBooks = props.books 

  useEffect(() => {
    if(booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  let genrelist = []
  allBooks.forEach(b => {
    b.genres.forEach(g => {
      if(!genrelist.includes(g)) {
        genrelist = genrelist.concat(g)
      }
    })
  })

  if (!props.show) {
    return null
  } 

  const filterHandler = async (filter) => {
    if(filter === 'all') {
      setBooks(allBooks)
    } else {
      await getBooks({ variables: { genre: filter } })
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genrelist.map((g,id) => <button key={id} onClick={() => filterHandler(g)}>{g}</button>)}
        <button onClick={() => filterHandler('all')}>all genres</button>
      </div>
    </div>
  )
}

export default Books