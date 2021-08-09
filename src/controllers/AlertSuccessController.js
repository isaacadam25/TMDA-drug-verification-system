import React from 'react';

const AlertSuccessController = () => {
    return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            <strong>Info</strong> Successfully executed!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    );
};

export default AlertSuccessController;