import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const testUser = 'Kayttaja'
const testPassword = 'Olli123'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(testUser)
  const [password, setPassword] = useState(testPassword)
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const noteForm = () => (
    <div>
      <h2>Add blog</h2>
    </div>
  )
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('trying to log in with', username, password, ' ....')
    
    try {
      const user = await loginService.login({username, password})
      console.log('succesfull - logged in')
      console.log('returned token: ', user.token)
      setUser(user)
      setUsername(testUser)
      setPassword(testPassword)
    } catch(e) {
      console.log("login failed ... please check your credentials")
    }
  }




  return (
    <div>
      {user === null ? loginForm() : noteForm()}
  
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App