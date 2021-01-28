import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const App = () => {

  const [someText, setSomeText] = useState("Ciao")

  const handleChange = (e) => {
    setSomeText(e.target.value)
  }


  return (

    <form >
      <input type="text" value={someText} onChange={handleChange}>
      </input>
      {/* 
      <textarea>ciao</textarea>

      <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select> */}
    </form>
  )


}






ReactDOM.render(<App />, document.getElementById('root'));

