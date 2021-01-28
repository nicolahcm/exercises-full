import React from 'react';




const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {

    const exercisesArray = course.parts.map(part => part.exercises)
    const sum = exercisesArray.reduce((sum, toSum) => sum + toSum)

    return (
        <h5>Number of exercises {sum}</h5>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ course }) => {

    console.log(course.parts.map(part => part))

    return (
        <div>
            {course.parts.map(part => <Part part={part} key={part.name} />)}
        </div>
    )
}


const Course = ({ course }) => {

    console.log(course)
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )

}



export default Course;