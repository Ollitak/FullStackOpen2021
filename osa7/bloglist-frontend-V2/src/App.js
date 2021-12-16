import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'


const testUser = ''
const testPassword = ''


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)
  //const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('retreiving blogs...')
      blogs.sort((a,b) => b.likes-a.likes)
      setBlogs( blogs )
    }
    )
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
    console.log('trying to log in with', username, password, ' ....')

    try {
      const user = await loginService.login({ username, password })
      console.log('succesfull - logged in')
      console.log('returned token: ', user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername(testUser)
      setPassword(testPassword)

      dispatch(createNotification('logged in succesfully'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)

    } catch(e) {
      console.log('login failed ... please check your credentials')
      dispatch(createNotification('wrong credentials, please check your username and password'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const addingBlog = async (blog) => {
    try{
      blogFormRef.current.toggleVisibility()

      const addedBlog = await blogService.addBlog(blog)
      console.log(addedBlog)
      setBlogs(blogs.concat(addedBlog))

      console.log('succesfully added ', addedBlog.title, '....')
      dispatch(createNotification('blog succesfully added - ' + addedBlog.title))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    } catch (e) {
      console.log('sending a blog to the server failed')
      dispatch(createNotification('sending a blog to the server failed'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const updatingBlog = async (blog, id) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog, id)

      // filteröidään vanha päivitetty blogi pois ja lisätään uusi blogi tilalle
      const newBlogSet = blogs.filter(b => b.id.toString() !== id).concat(updatedBlog)
      newBlogSet.sort((a,b) => b.likes-a.likes)
      setBlogs(newBlogSet)

      console.log('succesfully updated ', updatedBlog.title, '....')
      dispatch(createNotification('blog succesfully updated - ' + updatedBlog.title))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)

    } catch (e) {
      console.log('updating the blog failed')
      dispatch(createNotification('updating the blog failed'))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const removingBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      console.log('succesfully deleted ')

      // filteröidään poistettu blogi pois blogilistasta
      setBlogs(blogs.filter(b => b.id.toString() !== id))

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