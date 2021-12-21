
import React, { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all')
  

  const allBooks = props.books 
  let filteredBooks = [...allBooks]

  if(filter !== 'all') {
    console.log(filter)
    filteredBooks = allBooks.filter(b => b.genres.includes(filter))
  } 

  let genrelist = []
  allBooks.forEach(b => {
    b.genres.forEach(g => {
      if(!genrelist.includes(g)) {
        genrelist = genrelist.concat(g)
      }
    })
  })

  console.log("TEST")
  console.log(allBooks)
  console.log(filteredBooks)

  if (!props.show) {
    return null
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genrelist.map((g,id) => <button key={id} onClick={() => setFilter(g)}>{g}</button>)}
      </div>
    </div>
  )
}

export default Books