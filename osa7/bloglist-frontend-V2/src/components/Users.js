import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <tr>
      <th style={{ fontWeight:'normal' }}>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </th>
      <th style={{ fontWeight:'normal' }}>{user.blogs.length}</th>
    </tr>
  )
}

export default User