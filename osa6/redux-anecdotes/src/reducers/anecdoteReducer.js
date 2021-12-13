const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  // Function to sort anecdotes when VOTE is triggered
  const sortAnecdotes = (list) => {
    return list.sort((a,b) => b.votes - a.votes)
  }

  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToBeUpdated = state.find(a => a.id === id)
      const changedAnecdote = {
        content: anecdoteToBeUpdated.content,
        id: anecdoteToBeUpdated.id,
        votes: anecdoteToBeUpdated.votes + 1
      }
      const newState = state.map(a => a.id === id ? changedAnecdote : a)
      return sortAnecdotes([...newState])
    case 'CREATE_ANECDOTE':
      const anecdoteToBeAdded = {
        content: action.data,
        id: getId(),
        votes: 0
      }
      return state.concat(anecdoteToBeAdded)
    default:
      return state

  }
}


// Action creator: Vote
export const giveAVote = (id) => {
  return {type: "VOTE", data: {id: id}}
}

// Action creator: CreateAnecdote
export const createNew = (content) => {
  return {type: "CREATE_ANECDOTE", data: content}
}


export default reducer