import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from "./pages/Login";
import Approver from './pages/Approver'
import TMDA from './pages/DataEntry'

function App() {
  return (
    <div  className="container-fluid">
        <Switch>
            <Route path="/auth" component={() => <Login />} />
            <Route path="/tmda/approver/" component={() => <Approver/>} />
            <Route path="/tmda/data-entry/" component={() => <TMDA />} />
            <Redirect from="/" to="/auth" />
        </Switch>
    </div>
  );
}

export default App;
