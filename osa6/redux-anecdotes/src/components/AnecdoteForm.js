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
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(newContent) 
        dispatch(createNew(newAnecdote))

        dispatch(newNotification(`${newContent} created :)`))
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