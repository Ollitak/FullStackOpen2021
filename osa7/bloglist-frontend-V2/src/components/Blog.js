import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { updateLikes, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blog = blogs.find(b => b.id === id.toString())

  if(!blog) return null
  if(!user) return <h2> please, log in to see blogs</h2>

  const handleUpdate = async () => {
    const updatedblog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const response = await blogService.updateBlog(updatedblog, id)
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

  const handleDelete = async () => {
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

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={`//${blog.url}`}> {blog.url} </a>
      <br/>
      {blog.likes} likes
      <br/>
      added by {blog.user.username}
      <br/>
      <button onClick={handleUpdate}> like </button>
      <br/>
      {blog.user.username === user.username
        ? <button onClick={handleDelete}> remove </button>
        : null
      }
    </div>
  )
}

export default Blog