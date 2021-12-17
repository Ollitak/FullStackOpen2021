const sortBlogs = (list) => {
  return list.sort((a,b) => b.likes - a.likes)
}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case 'INIT_BLOGS':
    return sortBlogs(action.data)
  case 'ADD_BLOG':
    return state.concat(action.blog)
  case 'UPDATE_LIKES':
    // vaihdetaan vanha blogi parametrin uuteen blogiin ja sortataan blogit
    return sortBlogs(state.map(s => s.id === action.blog.id ? action.blog : s))
  case 'UPDATE_COMMENTS':
    return sortBlogs(state.map(s => s.id === action.blog.id ? action.blog : s))
  case 'REMOVE_BLOG':
    return state.filter(b => b.id.toString() !== action.id)
  default: return state
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOG',
    blog: blog
  }
}

export const updateLikes = (blog) => {
  return {
    type: 'UPDATE_LIKES',
    blog: blog
  }
}

export const updateComments = (blog) => {
  return {
    type: 'UPDATE_COMMENTS',
    blog: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    id: id
  }
}

export const initialize = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export default blogReducer