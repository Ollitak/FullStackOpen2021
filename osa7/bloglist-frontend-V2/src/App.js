import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'




const App = () => {

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

  const createBlogForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonLabel={'create a new blog'}>
        <CreateBlog/>
      </Togglable>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm></LoginForm>
      </div>
    )
  }

  const logout = () => {
    const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.removeItem('loggedUser')
      dispatch(addUser(null))
    }

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
      {user === null ? loginForm() : logout()}
      <Switch>
        <Route path = "/users/:id">
          <User users={users}/>
        </Route>

        <Route path = "/users">
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
          {user === null ? null : createBlogForm()}
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