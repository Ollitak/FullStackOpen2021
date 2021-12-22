import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
  `
const LoginForm = ({ show, setToken, setPage }) => {


  const [username, setUsername] = useState('Olli')
  const [password, setPassword] = useState('secret')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      // parannetaan error handling mahdollisesti myöhemmin
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault()
    await login({ variables: {username, password }})
  }

  if (!show) {
    return null
  }
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

}

export default LoginForm
