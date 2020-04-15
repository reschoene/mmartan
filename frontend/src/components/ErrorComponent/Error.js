import React from 'react';

/**
 * A simple component for displaying an error message.
 * @param {String} message error message to be displayed 
 */
const Error = ({message}) => {
    return (
        <div className="row mt-5 justify-content-center">
            <div className="alert alert-danger align-items-center">
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Error;