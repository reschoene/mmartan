import React from 'react';
import './Tittle.scss';

/** A simple functional component for displaying a Tittle on the page */
const Tittle = ({value}) => {
    return (
        <div className="tittle-container">
            <p>{value}</p>
        </div>
    );
};

export default Tittle;