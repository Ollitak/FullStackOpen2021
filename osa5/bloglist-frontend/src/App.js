import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const testUser = 'Kayttaja'
const testPassword = 'Olli123'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        <input type="text" value={username} onChange={e=>setUsername(e.target.value)}></input>
        <br/>
        Password:  
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
        <br/>
        <button type="submit">login</button>
      </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to log in with', username, password, ' ....')
    
    try {
      const user = await loginService.login({username, password})
      console.log('succesfull - logged in')
      console.log('returned token: ', user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername(testUser)
      setPassword(testPassword)
      setErrorMessage('logged in succesfully')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    } catch(e) {
      console.log("login failed ... please check your credentials")
      setErrorMessage('wrong credentials, please check your username and password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addingBlog = async (blog) => {
    try{
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.addBlog(blog)
      setBlogs(blogs.concat(addedBlog))
      console.log('succesfully added ', addedBlog.title, '....')
      setErrorMessage('blog succesfully added... title: ' + addedBlog.title)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (e) {
      console.log("sending a blog to the server failed")
      setErrorMessage('sending a blog to the server failed')
      setTimeout(() => {
        setErrorMessage(null)
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
      <Togglable ref={blogFormRef}>
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
      <h1> {errorMessage} </h1>

      {user === null ? null : logout()}

      {user === null ? loginForm() : createBlogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App