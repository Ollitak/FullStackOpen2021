import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { addBlog, updateLikes, removeBlog, initialize } from './reducers/blogReducer'

// declare test user details if you will
const testUser = ''
const testPassword = ''


const App = () => {
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initialize(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      console.log('User found from local storage')
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

      setUser(user)
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

  const addingBlog = async (blog) => {
    try{
      blogFormRef.current.toggleVisibility()

      const response = await blogService.addBlog(blog)
      dispatch(addBlog(response))

      console.log('succesfully added ', response.title)
      dispatch(createNotification('blog succesfully added - ' + response.title))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (e) {
      dispatch(createNotification('sending a blog to the server failed'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const updatingBlog = async (blog, id) => {
    try {
      const response = await blogService.updateBlog(blog, id)
      dispatch(updateLikes(response))

      console.log('succesfully updated ', response.title)
      dispatch(createNotification('blog succesfully updated - ' + response.title))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)

    } catch (e) {
      console.log('updating the blog failed')
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const removingBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))

      dispatch(createNotification('blog succesfully removed'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (e) {
      console.log('removing the blog failed')
      dispatch(createNotification('removing the blog failed'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }

  }



  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlogForm = () => {
    return (
      <Togglable ref={blogFormRef} buttonLabel={'create a new blog'}>
        <CreateBlog
          addingBlog={addingBlog}
        />
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
    <div>
      <h1> {notification} </h1>

      {user === null ? null : logout()}

      {user === null ? loginForm() : createBlogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updatingBlog={updatingBlog} removingBlog={removingBlog} user={user} />
      )}
    </div>
  )
}

export default App