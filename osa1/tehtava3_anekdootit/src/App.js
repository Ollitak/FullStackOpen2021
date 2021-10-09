import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState([0])
  const zeros = Array(anecdotes.length).fill(0)
  const [votes, setVote] = useState(zeros)

  const update = () => {
    const max = anecdotes.length
    const min = 0
    setSelected(Math.floor(Math.random() * (max - min) + min))
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVote(copy)
  } 

  const mostVotes = () => {
    let max = votes[0]
    let index = 0;
    for(let i=1;i<votes.length;i++){
      if(votes[i] > max){
        max = votes[i]
        index = i
      }
    }
    return index;
  }


  return (
    <div>
      <h1> Anecdote of the day </h1>
      <h5>{anecdotes[selected]}</h5>
      <h5>has {votes[selected]} votes</h5>
      <button onClick={update}>Update</button>
      <button onClick={vote}>Vote</button>

      <h1> Anecdote with most votes </h1>
      <h5>{anecdotes[mostVotes()]}</h5>


    </div>
  )
}

export default App