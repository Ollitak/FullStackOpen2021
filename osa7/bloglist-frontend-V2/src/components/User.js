import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if(!user) return null

  // ehdollinen renderöinti riippuen onko käyttäjällä blogeja
  if(user.blogs){
    return (
      <div>
        <h1> {user.username} </h1>
        <h4> added blogs </h4>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </div>
    )
  } else {
    <div>
      <h1> {user.username} </h1>
      <h4> added blogs </h4>
    </div>
  }

}

export default User
