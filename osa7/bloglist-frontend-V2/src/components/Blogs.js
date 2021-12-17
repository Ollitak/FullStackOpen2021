import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Blogs = ({ blog }) => {
  return (
    <div className={'bloglistdiv'} >
      <Link className={'bloglist'} to={`blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

export default Blogs