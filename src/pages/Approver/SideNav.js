import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    return (
        <div className="col-sm-12 col-md-3">
            <div className="list-group list-group-flush">
                <NavLink to="/tmda/approver/" className="list-group-item list-group-item-action">
                    <i className="fa fa-dashboard" /> Dashboard
                </NavLink>
                <NavLink to="/tmda/approver/unapproved-batch" className="list-group-item list-group-item-action">
                    <i className="fa fa-lock"  /> Unapproved Batches
                </NavLink>
                <NavLink to="/tmda/approver/reports" className="list-group-item list-group-item-action">
                    <i className="fa fa-folder-open"  /> Reports
                </NavLink>
            </div>
        </div>
    );
};

export default SideNav;