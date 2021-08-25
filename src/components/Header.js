import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const { profile } = props;

  const { last_name, first_name, usertype_name: role } = profile;

  return (
    <div style={{ height: "50px", background: "#bed63d" }} className="row">
      <div className="col-sm-12 col-md-10">
        <Link to="/" className="navbar-brand" style={{ color: "#000" }}>
          TMDA Drug Verification
        </Link>
      </div>
      <div className="col-sm-12 col-md-2">
        <div className="dropdown mt-1 float-end">
          <button
            className="btn btn-secondary dropdown-toggle"
            style={{ background: "#bed63d", color: "#000" }}
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <em>
              {first_name} {last_name}
            </em>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="dropdownMenuButton2"
          >
            {role === "approver" && (
              <li>
                <Link to="/tmda/approver/profile" className="dropdown-item">
                  Profile{" "}
                  <i style={{ marginLeft: 16 }} className="fa fa-user" />
                </Link>
              </li>
            )}
            {role === "data_entry" && (
              <li>
                <Link to="/tmda/data-entry/profile" className="dropdown-item">
                  Profile{" "}
                  <i style={{ marginLeft: 16 }} className="fa fa-user" />
                </Link>
              </li>
            )}
            <li>
              <Link to="/logout" className="dropdown-item">
                Logout{" "}
                <i style={{ marginLeft: 16 }} className="fa fa-power-off" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
