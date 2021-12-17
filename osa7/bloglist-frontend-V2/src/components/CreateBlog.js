import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const CreateBlog = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()


  const handleAddingBlog = async (event) => {
    event.preventDefault()
    try{
      const response = await blogService.addBlog({ title, author, url })
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

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <div>
        <h2> create new blog</h2>
        <form onSubmit={handleAddingBlog}>
          <input id="titleInput" placeholder="Title" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
          <br/>
          <input id="authorInput" placeholder="Author" type="text" value={author} onChange={e => setAuthor(e.target.value)}></input>
          <br/>
          <input id="urlInput" placeholder="url" type="text" value={url} onChange={e => setUrl(e.target.value)}></input>
          <br/>
          <button id="createButton" type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog

