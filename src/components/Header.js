import React from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
    const { profile } = props;

    const { last_name, first_name } = profile;

    return (
        <div style={{ height: "50px", background: "#bed63d" }} className="row">
            <div className="col-sm-12 col-md-10">
                <a className="navbar-brand" href="#" style={{ color: "#000" }}>TMDA Drug Verification</a>
            </div>
            <div className="col-sm-12 col-md-2">
                <div className="dropdown mt-1 float-end" >
                    <button className="btn btn-secondary dropdown-toggle" style={{ background: "#bed63d", color: "#000" }} type="button" id="dropdownMenuButton2"
                            data-bs-toggle="dropdown" aria-expanded="false">
                       <em>{first_name} {last_name} </em>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li><a className="dropdown-item active" href="#">Dashboard</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><Link to="/" className="dropdown-item">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;