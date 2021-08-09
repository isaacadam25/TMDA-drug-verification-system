import React, { useState } from 'react';
import { login, getUserProfile, setUserToken } from "../services/auth.services";

const initialValues = {
    username: 'data_entry',
    password: 'Hospital1234'
}

const Login = () => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values)
    };

    const handleSubmit =async (e) => {
      e.preventDefault();
      try {
          const getToken = await login(values.username, values.password);
          const { token } = getToken.data;
          setUserToken(token);
          try {
              const profile = await getUserProfile(token);
              const { usertype_name: role } = profile.data;
              if (role === "approver") {
                  window.location = "/tmda/approver/";
              } else if (role === "data_entry") {
                  window.location = "/tmda/data-entry/";
              } else {
                  console.log("User Not Found");
              }
          } catch (ex) {
              console.log(ex.response);
          }
      } catch (ex) {
          console.log(ex.response);
      }
    };

    return (
        <div className="row justify-content-center">
            <div  className="col-md-8" style={{ height: "100vh", backgroundImage: "url('/images/tmda-logo.png')", backgroundRepeat: "no-repeat", backgroundPosition: "top" }} >
                <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
                    <h4 className="mb-3 text-center">Login Here</h4>
                    <div className="row justify-content-center">
                        <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                            <input type="text" onChange={handleChange} value={values.username} name="username" className="form-control" />
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input type="password" onChange={handleChange} value={values.password} name="password" className="form-control" />
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary float-end">Login</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;