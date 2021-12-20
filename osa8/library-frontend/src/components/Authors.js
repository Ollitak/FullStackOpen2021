import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_BORN = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    bookCount
    born
    id
  }
}
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  console.log(name)

  const [ changeBorn ] = useMutation(EDIT_BORN)

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const setBirthyear = (e) => {
    e.preventDefault()

    changeBorn({variables: {name, setBornTo: parseInt(born)}})
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2> Set birthyear </h2>
      <div>
        <div>
          <select onChange={(e) => setName(e.target.value)}>
            {authors.map(a => <option key={a.name} value={a.name}> {a.name} </option>)}
          </select>
        </div>    
        <div>
          born
          <input
                type='number'
                value={born}
                onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button onClick={setBirthyear}> update author  </button>
      </div>
    </div>
  )
}

export default Authors