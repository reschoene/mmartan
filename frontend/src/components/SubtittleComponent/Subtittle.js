import React from 'react';
import './Subtittle.scss';

/** A simple functional component for displaying a Subtittle on the page */
const Subtittle = ({value}) => {
    return(
        <div className="subtittle">{value}</div>
    );
}

export default Subtittle;