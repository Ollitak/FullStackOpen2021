import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (request) => {
  console.log('adding blog... current token: ' , token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, request, config)
  return response.data
}

const exports = { getAll, addBlog, setToken }

export default exports