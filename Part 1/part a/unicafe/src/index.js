import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => {

  return (
    <p>{text}: {value}</p>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h4> No Feedback Given!</h4>
      </div>
    )
  }

  return (
    <div>
      <Statistic text="Positive" value={good} />
      <Statistic text="Neutral" value={neutral} />
      <Statistic text="Negative" value={bad} />
      <Statistic text="All" value={good + neutral + bad} />
      <Statistic text="Average" value={(good - neutral) / (good + neutral + bad)} />
      <Statistic text="Positive percentage" value={good / (good + neutral + bad)} />
    </div>
  )
}


const Button = ({ clickHandle, text }) => {

  return (
    <button onClick={clickHandle}>{text}</button>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  // event handlers
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)


  return (
    <div>
      <h1> Give Feedback </h1>
      <Button text="good" clickHandle={increaseGood} />
      <Button text="good" clickHandle={increaseNeutral} />
      <Button text="good" clickHandle={increaseBad} />

      <h1> Statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

