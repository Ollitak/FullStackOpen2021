import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveAVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'



const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(giveAVote(id))
        
        // Etsitään haluttu anekdootti ja päivitetään
        // notificationin tilaa + 5 sekunnin päästä takaisin
        const voted = anecdotes.find(a => a.id === id)
        dispatch(newNotification(`you voted ${voted.content} :)`))

        setTimeout(function(){
            dispatch(newNotification(null))
        }, 5000);
        
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

