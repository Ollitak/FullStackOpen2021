import React from 'react'


const Header = (props) => {
    return <h1>{props.course}</h1>
  }


const Content = (props) => {  
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
    </div>
  )
}


const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
}


const Sum = (props) => {
  const sumObject = props.parts.reduce((prev,cur) => ({exercises: prev.exercises + cur.exercises}))
  return(
    <div>
      <h5>total of {sumObject.exercises} exercises</h5>
  </div>
  )
}


const Course = ({course}) => {
    return(
      <div>
        {course.map(course => 
          <div key={course.id}>
            <Header key={course.id} course={course.name}/>
            <Content key={course.id+1} parts={course.parts}/>
            <Sum key={course.id+2} parts={course.parts}/>
          </div>
        )}
      </div>
    )
    
  }

export default Course
  