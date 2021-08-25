import React, { useState } from "react";
import { errorToast } from "../utils/notify";
import { login, getUserProfile, setUserToken } from "../services/auth.services";

const initialValues = {
  username: "approver",
  password: "Hospital1234",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      errorToast("There is error in your form fields");
    } else {
      try {
        const { data } = await login(values.username, values.password);
        const { token } = data;
        setUserToken(token);
        try {
          const { data } = await getUserProfile(token);
          const { usertype_name: role } = data;
          if (role === "approver") {
            window.location = "/tmda/approver/";
          } else if (role === "data_entry") {
            window.location = "/tmda/data-entry/";
          } else {
            errorToast("Incorrect username/password");
          }
        } catch (ex) {
          errorToast("Unexpected error occurred during login");
        }
      } catch (ex) {
        if (Number(ex.response.status) >= 500) {
          errorToast("Unexpected error occurred during login");
        } else {
          errorToast("Incorrect username/password");
        }
      }
    }
  };

  const validateForm = () => {
    if (values.username.length > 15) {
      setUsernameError("Username can not exceed 15 characters");
      return false;
    } else {
      setUsernameError("");
    }
    if (values.password.length > 16) {
      setPasswordError("Password can not exceed 16 characters");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  return (
    <div className="row justify-content-center">
      <div
        className="col-md-8"
        style={{
          height: "100vh",
          backgroundImage: "url('/images/tmda-logo.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      >
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <h4 className="mb-3 text-center">Login Here</h4>
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  className="form-control"
                />
                <div className="text-danger">{usernameError}</div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  className="form-control"
                />
                <div className="text-danger">{passwordError}</div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="mb-3">
                <button type="submit" className="btn btn-primary float-end">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
