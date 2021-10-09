import React, { useState } from 'react'



const StatisticsLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
        <td>{props.mark}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = 100*good/sum
  
  
  if(sum === 0){
    return <div>No feedback given</div>
  } else {
    return(
      <table>
          <StatisticsLine text="good" value={good}></StatisticsLine>
          <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
          <StatisticsLine text="bad" value={bad}></StatisticsLine>
          <StatisticsLine text="all" value={sum}></StatisticsLine>
          <StatisticsLine text="average" value={average}></StatisticsLine>
          <StatisticsLine text="positive" value={positive} mark='%'></StatisticsLine>  
      </table>
      )
  }
}




const Button = (props) => {
  return <button onClick={() => props.stateCall(props.state + 1)}> {props.name} </button>
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button stateCall={setGood} state={good} name={'good'}> </Button>
      <Button stateCall={setNeutral} state={neutral} name={'neutral'}> </Button>
      <Button stateCall={setBad} state={bad} name={'bad'}> </Button>
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  
  )
}

export default App
