import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'


const NewAnecdote = () => {
    
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const newAnecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNew(newAnecdote))

        dispatch(newNotification(`${newAnecdote} created :)`))
        setTimeout(function(){
            dispatch(newNotification(null))
        }, 5000);
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}


export default NewAnecdote