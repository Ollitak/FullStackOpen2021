import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  // Function to sort anecdotes when VOTE is triggered
  const sortAnecdotes = (list) => {
    return list.sort((a,b) => b.votes - a.votes)
  }

  switch(action.type){
    case 'VOTE':
      const newState = state.map(a => a.id === action.data.id ? action.data : a)
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
export const giveAVote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.updateLikes(anecdote)
    dispatch({type: "VOTE", data: updated})
  }
}

// Action creator: create anecdote
export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({type: "CREATE_ANECDOTE", data: newAnecdote})
  }
}

// Action creator: initialize anecdotes
export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: "INIT_ANECDOTES", data: anecdotes})
  }
}



export default reducer