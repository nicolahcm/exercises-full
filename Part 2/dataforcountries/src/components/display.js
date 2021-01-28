import React from 'react'


const Display = ({ matchCountries }) => {
    if (matchCountries.length >= 10) {
        return (
            <h4>Too many matching countries!</h4>
        )
    } else if (matchCountries.length >= 2) {

        return (<div>
            {matchCountries.map(country => <li key={country.name}>{country.name}</li>)}
        </div>)

    } else if (matchCountries.length === 1) {

        return (
            <div>
                <h2>{matchCountries[0].name}</h2>

                <p>Capital: {matchCountries[0].capital}</p>
                <p>Population: {matchCountries[0].population}</p>

                <h4> Languages </h4>
                {matchCountries[0].languages.map(language => <li key={language.name}>{language.name}</li>)}

                <img src={matchCountries[0].flag} />
            </div>
        )

    } else {
        return (
            <div>
                <p>No match</p>
            </div>
        )
    }

}


export default Display