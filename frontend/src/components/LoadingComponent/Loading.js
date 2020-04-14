import React from 'react';

const Loading = ({description}) => {
    return (
        <div className="row mt-5 justify-content-center align-items-center">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <div className="ml-1">{description}</div>
        </div>
    );
};

export default Loading;