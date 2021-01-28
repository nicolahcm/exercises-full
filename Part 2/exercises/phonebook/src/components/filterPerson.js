import React from 'react'




const FilterPersons = ({ filterText, handleFilterchange, matchPeople }) => {
    return (
        <div>
            <h2>Research a Person</h2>
            <input type="text" value={filterText} onChange={handleFilterchange} />

            <h4> People matched: </h4>
            {matchPeople.map(name => <p key={name}>{name}</p>)}
        </div>
    )
}



export default FilterPersons