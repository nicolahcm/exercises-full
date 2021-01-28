import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

window.axios = axios



const App = () => {
  const [notes, setNotes] = useState([])


  console.log("inizio 1")

  useEffect(() => {

    console.log("using effect 2")

    axios.get('http://localhost:3001/notes').then(response => {
      console.log('3.5')

      // setNotes(response.data) <-- Prova prima con e poi senza. Leggi i log per caprie l'ordine! Utile esercizio per video corso!

      console.log("successful request 4")
    })


  }, [])


  console.log("notes are 3", notes)


  return (
    <div>

      Ciao

    </div>
  )




}


ReactDOM.render(


  <App />

  ,
  document.getElementById('root')
);


