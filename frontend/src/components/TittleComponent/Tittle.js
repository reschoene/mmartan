import React from 'react';
import './Tittle.scss';

/** A simple functional component for displaying a Tittle on the page 
 * @param {string} value text to be displayed. If empty, it doesn't renders the component
*/
const Tittle = ({value}) => {
    if (!value) 
        return (<></>)
    else return (
        <div className="tittle-container">
            <p>{value}</p>
        </div>
    );
};

export default Tittle;