import React from 'react';

const TableController = (props) => {
    const { children } = props;

    return (
        <table className="table table-striped table-hover">
            {children}
        </table>
    );
};

export default TableController;