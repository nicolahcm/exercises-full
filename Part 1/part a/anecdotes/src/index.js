import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ handleClick, text }) => {

  return (
    <button onClick={handleClick}> {text} </button>
  )
}




const DisplayBestJoke = ({ votes }) => {

  function highestNr(arr) {
    // returns the index of arr with highest value

    let indexMax = 0

    for (let j in arr) {
      if (arr[j] >= arr[indexMax]) {
        indexMax = j
      }

    }
    return parseInt(indexMax)
  }

  return (
    <div>
      <h2>The best joke is</h2>
      {anecdotes[highestNr(votes)]}

      <h4> With {votes[highestNr(votes)]} votes</h4>
    </div>
  )


}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])


  // event handlers:
  const generateRandomN = (n) => () => {
    // random integer number from 0 to n-1
    let randomNr = Math.floor((Math.random() * n))

    // change state
    setSelected(randomNr)
  }

  const voteForJoke = () => {
    let [...newVotes] = votes
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  return (
    <div>

      {props.anecdotes[selected]}

      <br />

      <h4> This joke has {votes[selected]} votes</h4>

      <Button handleClick={() => voteForJoke()} text="vote for this joke" />

      <Button handleClick={generateRandomN(anecdotes.length)} text="another joke" />


      <DisplayBestJoke votes={votes} />
    </div>

  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


