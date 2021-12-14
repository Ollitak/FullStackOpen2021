import React from 'react'
import { createNew } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const NewAnecdote = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()

        const newContent = event.target.anecdote.value
        props.createNew(newContent)

        event.target.anecdote.value = '' 

        props.newNotification(`${newContent} created :)`,5000)

    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

const mapDispatchToProps = { newNotification, createNew }

const ConnectedNotification = connect(null, mapDispatchToProps)(NewAnecdote)

export default ConnectedNotification