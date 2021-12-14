import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const NewAnecdote = () => {
    
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()

        const newContent = event.target.anecdote.value
        dispatch(createNew(newContent))

        event.target.anecdote.value = '' 

        dispatch(newNotification(`${newContent} created :)`,5000))

    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}


export default NewAnecdote