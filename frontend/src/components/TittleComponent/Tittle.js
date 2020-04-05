import React from 'react';
import './Tittle.scss';

const Tittle = ({value}) => {
    return (
        <div className="tittle-container">
            <p>{value}</p>
        </div>
    );
};

export default Tittle;