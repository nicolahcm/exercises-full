import React, { useState, useEffect } from 'react';
import FilterPersons from './filterPerson';
import Persons from './personsRender';
import PersonForm from './personForm';
import Notification from './notification';

// services controller for HTTP requests.
import personsServices from '../services/persons'




const App = () => {

    /// States

    // all people
    const [persons, setPersons] = useState([])

    // states for controlling input forms
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterText, setFilterText] = useState('')

    // matching people for the filter.
    const [matchPeople, setMatchPeople] = useState([])

    // states for managing the notification. 
    const [errorMessage, setErrorMessage] = useState(null)  // this is the msg
    const [successOrError, setSuccessOrError] = useState('success') // this is for different styling between success and failure



    // useEffect
    useEffect(() => {
        personsServices.getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    //// Event handlers 
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    // add or update a person.
    const addPerson = (event) => {
        event.preventDefault()
        let personWithSameName = persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

        if (personWithSameName) {
            let confirmationUpdate = window.confirm(`the user ${personWithSameName} is already in the db. Update the number?`)

            if (confirmationUpdate) {
                let idOfPerson = personWithSameName.id

                // trick of updating the object
                let updatedPerson = { ...personWithSameName, number: newNumber }

                // trick for changing one element in the list
                setPersons(persons.map(person => person.id === idOfPerson ? updatedPerson : person))

                // put request.
                personsServices
                    .update(idOfPerson, updatedPerson)
                    .then(res => {
                        console.log(res);
                        setErrorMessage(`Person correctly updated!`);
                        setSuccessOrError('success')

                        setTimeout(() => setErrorMessage(null), 5000)
                    })
                    .catch(error => {
                        console.log(error);
                        setErrorMessage(`Information of ${personWithSameName.name} has already been deleted from the server!`);
                        setSuccessOrError('error')

                        setTimeout(() => setErrorMessage(null), 5000)
                    })
            }

        } else {

            const objectNewPerson = { name: newName, number: newNumber }
            // saving it in the db (and then displaying it after
            // retrieving the id.)
            personsServices.create(objectNewPerson)
                .then(response => {
                    let idObject = response.data.id
                    console.log(idObject)

                    objectNewPerson.id = idObject
                    setPersons(persons.concat(objectNewPerson))

                    setErrorMessage(`Person correctly added!`);
                    setSuccessOrError('success')

                    setTimeout(() => setErrorMessage(null), 5000)
                })


            // cleaning fields
            setNewName("")
            setNewNumber("")
        }
    }

    const handleFilterchange = (event) => {
        // controlling the input of filter.
        setFilterText(event.target.value)

        let lowerCase = filterText.toLocaleLowerCase()
        let namesList = persons.map(person => person.name.toLocaleLowerCase())
        let matchingList = namesList.filter(name => name.includes(lowerCase))

        setMatchPeople(matchingList)
    }

    const handleDelete = (e) => {

        let wantDelete = window.confirm('Are you sure you want to delete?')

        if (wantDelete) {
            const id = parseInt(e.target.getAttribute('data-id'))

            // deleting from UI
            setPersons(persons.filter(person => person.id !== id))

            // deleting from DB
            personsServices
                .deletePerson(id)
                .then(response => console.log(response))
        }
    }

    return (
        <div>
            <FilterPersons
                handleFilterchange={handleFilterchange}
                matchPeople={matchPeople}
                filterText={filterText} />

            <Notification
                message={errorMessage}
                successOrError={successOrError} />

            <h2>Numberbook</h2>

            <PersonForm
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber} />

            <h2>Numbers</h2>
            <Persons
                persons={persons}
                handleDelete={handleDelete} />

        </div>
    )
}

export default App