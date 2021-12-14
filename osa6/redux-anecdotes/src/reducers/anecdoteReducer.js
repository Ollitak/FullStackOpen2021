
const reducer = (state = [], action) => {
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
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state

  }
}

// Action creator: vote
export const giveAVote = (id) => {
  return {type: "VOTE", data: {id: id}}
}

// Action creator: create anecdote
export const createNew = (content) => {
  return {type: "CREATE_ANECDOTE", data: content}
}

// Action creator: initialize anecdotes
export const initialize = (content) => {
  return {type: "INIT_ANECDOTES", data: content}
}



export default reducer