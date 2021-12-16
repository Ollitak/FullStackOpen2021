import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initialize } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'

// declare a test user details if you will
const testUser = 'Kayttaja'
const testPassword = 'Olli123'


const App = () => {
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)
  const [users, setUsers]= useState([])

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initialize(blogs))
    })
  }, [])

  useEffect(() => {
    userService.getAll().then(u => {
      setUsers(u)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      console.log('User found from local storage')
      const user = JSON.parse(loggedUserJSON)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(addUser(null))
  }

  const createBlogForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonLabel={'create a new blog'}>
        <CreateBlog/>
      </Togglable>
    )
  }

  const logout = () => {
    return (
      <div>
        <b> {user.username} logged in </b>
        <button onClick={handleLogout}> log out </button>
      </div>)
  }

  return (
    <Router>
      <h2>blogsapp</h2>
      <h1> {notification} </h1>
      {user === null ? null : logout()}
      <Switch>

        <Route path = "/users/:id">
          {user === null ? loginForm() : null}
          <User users={users}/>
        </Route>

        <Route path = "/users">
          {user === null ? loginForm() : null}
          <h2>Users</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
              {users.map(user =>
                <Users key={user.id} user={user}/>
              )}
            </tbody>
          </table>
        </Route>

        <Route path = "/blogs/:id">
          <Blog></Blog>
        </Route>

        <Route path = "/">
          {user === null ? loginForm() : createBlogForm()}
          <h2>list of blogs</h2>
          {blogs.map(blog =>
            <Blogs key={blog.id} blog={blog} />
          )}
        </Route>

      </Switch>
    </Router>
  )
}

export default App