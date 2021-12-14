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

const updateLikes = async (anecdote) => {
    const url = baseUrl + `/${anecdote.id}`

    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    console.log(updatedAnecdote)
    const response = await axios.put(url, updatedAnecdote)
    return response.data
}


const exportObject = { getAll, createNew, updateLikes }

export default exportObject