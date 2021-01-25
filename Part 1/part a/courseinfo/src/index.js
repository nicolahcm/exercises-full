import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name}: {props.part.exercises}
    </p>
  )
}

const Content = (props) => {


  // pro tip: 
  console.log(props)

  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Total Exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// Probably, I suppose that is good practice to pass, as props, all the data inside the parent component,
// because in future we might want some children to communicate data to each other, but they can't since 
// data is only passed from top to bottom.
// Since it wasn't specified, I passed only parts of the course object to the respective children components
// and not the whole course object.


ReactDOM.render(<App />, document.getElementById('root'))

