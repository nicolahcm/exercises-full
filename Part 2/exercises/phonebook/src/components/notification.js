import React from 'react';


const Notification = ({ message, successOrError }) => {
    if (message === null) {
        return null

    }

    return (
        <div className={successOrError}>
            {message}
        </div>
    )



}

export default Notification