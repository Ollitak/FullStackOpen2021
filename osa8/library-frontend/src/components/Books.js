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

  // this useEffect is applied when the query for filtered books is finished
  // and it sets the state of book variable to correspond the filtered books
  useEffect(() => {
    if(booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  // this useEffect is applied whenever a new book is added (by other users)
  // to the cache and it updates the list of books in the page
  // [this could be improved as it resets the filter, but will do for now]
  useEffect (() => {
      setBooks(props.books)
  },[props.books])

  // Parses a general list of all possbile genres during every render
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

  // this function runs whenever a filter is applied and in case the
  // fitler is not all, it makes a query for filtered books
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