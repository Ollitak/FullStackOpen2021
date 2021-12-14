import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


// Generate random id for new anecdotes
const getId = () => (100000 * Math.random()).toFixed(0)


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newAnecdote= {
        content: content,
        id: getId(),
        votes: 0
      }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}


const exportObject = { getAll, createNew }

export default exportObject