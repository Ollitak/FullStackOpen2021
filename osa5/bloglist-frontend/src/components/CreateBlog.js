import React, { useState } from 'react'

const CreateBlog = ({ addingBlog }) => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const handleAddingBlog = async (event) => {
    event.preventDefault()
    console.log('trying to add blog', title, author, ' ...')
    await addingBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <div>
        <h2> create new blog</h2>
        <form onSubmit={handleAddingBlog}>
          title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
          <br/>
          author:
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)}></input>
          <br/>
          url:
          <input type="text" value={url} onChange={e => setUrl(e.target.value)}></input>
          <br/>
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog

