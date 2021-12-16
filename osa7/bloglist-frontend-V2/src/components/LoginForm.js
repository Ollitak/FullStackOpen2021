import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userReducer'

// declare a test user details if you will
const testUser = 'Kayttaja'
const testPassword = 'Olli123'


const LoginForm = () => {
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to log in with', username)
    try {
      const user = await loginService.login({ username, password })
      console.log('succesfully logged in')

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      console.log('user added to the local storage')
      blogService.setToken(user.token)

      dispatch(addUser(user))
      setUsername(testUser)
      setPassword(testPassword)

      dispatch(createNotification('logged in succesfully'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)

    } catch(e) {
      dispatch(createNotification('login failed, please check your credentials'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Please, log in</h2>
      <br/>
        Username:
      <input id='username' type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
      <br/>
        Password:
      <input id='password' type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      <br/>
      <button id='loginbutton' type="submit">login</button>
    </form>
  )
}

export default LoginForm