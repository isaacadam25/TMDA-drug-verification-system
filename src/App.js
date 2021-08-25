import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Approver from "./pages/Approver";
import TMDA from "./pages/DataEntry";
import Logout from "./pages/components/Logout";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

function App(props) {
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/auth" component={() => <Login />} />
        <Route path="/tmda/approver/" component={() => <Approver />} />
        <Route path="/tmda/data-entry/" component={() => <TMDA {...props} />} />
        <Route path="/logout" component={() => <Logout />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </div>
  );
}

export default App;
