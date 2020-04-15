import React from 'react';
import './Subtittle.scss';

/** A simple functional component for displaying a Subtittle on the page 
 * @param {string} value text to be displayed. If empty, it doesn't renders the component
*/
const Subtittle = ({value}) => {
    if (!value) 
        return (<></>)
    else return(        
        <div className="subtittle">{value}</div>
    );
}

export default Subtittle;