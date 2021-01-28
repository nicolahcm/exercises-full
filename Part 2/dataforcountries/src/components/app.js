import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './display'


const App = () => {

    const [allCountries, setAllCountries] = useState([])
    const [matchCountries, setMatchCountries] = useState([])
    const [stringToSearch, setStringToSearch] = useState("")

    // after rendering App, requests all countries.
    useEffect(() => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                setAllCountries(response.data)
            })

    }, [])

    //
    const handleChange = (e) => {
        setStringToSearch(e.target.value)
    }

    const handleOnKeyUp = (e) => {
        const countriesThatMatch = allCountries.filter(country => country.name.toLowerCase().includes(stringToSearch.toLocaleLowerCase()))

        setMatchCountries(countriesThatMatch)
        console.log(countriesThatMatch)
    }

    return (
        <div>
            find countries
            <input
                value={stringToSearch}
                onChange={handleChange}
                onKeyUp={handleOnKeyUp}
            />


            <Display matchCountries={matchCountries} />
        </div>
    )

}


export default App