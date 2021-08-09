import React from 'react';

const AlertErrorController = () => {

    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Ooops!</strong> There is an error occurred. Please try again!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    );
};

export default AlertErrorController;