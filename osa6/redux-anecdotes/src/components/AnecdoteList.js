import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveAVote } from '../reducers/anecdoteReducer'




const Anecdotes = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(giveAVote(id))
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
            )}
      </ul>
    )

}

export default Anecdotes

