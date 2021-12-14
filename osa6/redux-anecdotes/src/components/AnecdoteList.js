import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { giveAVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'



const Anecdotes = () => {
    const dispatch = useDispatch()

    // Haetaan filterin tila
    const filterState = useSelector(state => state.filter)

    // Haetaan anekdootit storesta (ilman filteröintiä)
    const unfilteredAnecdotes = useSelector(state => state.anecdotes)
    // Filteröidään vain filterin mukaiset anekdootit
    const anecdotes = unfilteredAnecdotes.filter(a => a.content.includes(filterState))


    const vote = (id) => {
        dispatch(giveAVote(id))
        
        // Etsitään haluttu anekdootti, päivitetään
        // notificationin tilaa ja 5 sekunnin päästä takaisin
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

