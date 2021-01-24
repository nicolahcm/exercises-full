# Introduction to react.


1) const App = () => (<div>CIAO!</div>)   // le parentesi tonde racchiudono espressioni. Sono vanilla JS! Non react!


2) JSX (è un'espressione che ritorna un oggetto JS.)
-2.1) You can enclose evaluation of JS expressions in curly braces.






Important:) How to ENCLOSE JSX? There are 3 alternatives.


a) Enclose all in a div tag. 

b) (not reccomended because ugly code)
array of components:   
 
const App = () {
return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
    <Footer />
  ]
}


c) Using fragments.




3) Passing down props: 
here is the children:

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>    // props is a javascript object!
    </div>
  )
}


Here is the father: how to pass props:

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />         // HERE is hardcoded
      <Hello name={2+2} />            // Here is a variable expression.
    </div>
  )
}


4). Also keep in mind that React component names must be Capitalized.  Footer and not footer. (otherwise it creates an html tag.)


////////////////////////////////
FROM PART B

5) Pro tip: prints the props:
const App = (props) => {

  console.log(props)

  return (
    <div>
    ......
    </div>
  )
}



6) Putting helper functions inside the components:

const Hello = (props) => {

  // Helper functions inside components. Is it good practice?

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}



7) Destructuring the props:

  const {name, age} = props

Even better: 

const Hello = ({ name, age }) => { .....



8) Ogni volta che una componente modifica stato (setState), 
viene rirenderizzata = rieseguito tutto il codice del suo corpo! (escludendo la parte dello state e setState.)


9) Usually we do not define event handlers in JSX.


10) A children can setState of the parent! If with the hooks we pass down the setCounter function to the children, 
then the children can modify the state of the parent!



11) it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. 

---->> Immutable states! We use 
setState(newState)

never use:
state = newState


12) Conditional rendering... Use a new component. If something, returns some JSX. If something else, return other JSX.

Usually basing on some states of our application.
