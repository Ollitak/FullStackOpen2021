import React, { useState } from 'react'

const Blog = ({blog}) => {
  // Tila, jolla kontrolloidaan näytetäänkö blogi kokonaan vai lyhyesti
  // View talletnaa tilaan blogin id, jos halutaan näyttää kaikki tiedot
  // Hide poistaa tilasta blogin id:n
  const [showinfo, setShowinfo] = useState([])


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(showinfo)

  const handleViewBlog = () => {
    setShowinfo(showinfo.concat(blog.id.toString()))
  }

  const handleHideBlog = () => {
    setShowinfo(showinfo.filter(i => i.toString() !== blog.id.toString()))
  }

  const shortinformation = () => {
    return(
      <div>
        {blog.title}
        <button onClick={handleViewBlog}> view </button>
      </div> 
      ) 
  }
  const longinformation = () => {
    return(
      <div style={blogStyle}>
        Title: {blog.title}
        <button onClick={handleHideBlog}> hide </button>
        <br/>
        Author: {blog.author}
        <br/>
        Likes: {blog.likes}
        <button> like </button>
        <br/>
        Url: {blog.url}
        <br/>
      </div> 
      ) 
  }

  return (
    <div style={blogStyle}>
      {showinfo.includes(blog.id.toString()) ? longinformation() : shortinformation()}
      <br/>
    </div>
  )

  
}


export default Blog