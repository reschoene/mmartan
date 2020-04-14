import React from 'react';

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