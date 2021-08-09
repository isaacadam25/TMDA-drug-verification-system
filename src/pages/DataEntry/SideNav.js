import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    root: {
        "& .active": {
            background: "red"
        }
    }
}

const SideNav = () => {
    return (
        <div className="col-sm-12 col-md-3 mt-1">
            <div className="list-group list-group-flush">
                <NavLink to="/tmda/data-entry/" className="list-group-item list-group-item-action">
                    <i className="fa fa-dashboard" /> Dashboard</NavLink>
                <NavLink to="/tmda/data-entry/register-batch" className="list-group-item list-group-item-action">
                    <i className="fa fa-plus"  /> Register Batch</NavLink>
                <NavLink to="/tmda/data-entry/unapproved-batch" className="list-group-item list-group-item-action">
                    <i className="fa fa-lock"  /> Unapproved Batches</NavLink>
                <NavLink to="/tmda/data-entry/reports" className="list-group-item list-group-item-action">
                    <i className="fa fa-folder-open"  /> Reports</NavLink>
            </div>
        </div>
    );
};

export default SideNav;