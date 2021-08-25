import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { errorToast } from "../../utils/notify";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Header from "../../components/Header";
import SideNav from "./SideNav";
import Dashboard from "./Dashboard";
import UnapprovedBatches from "./UnapprovedBatches";
import ApproverReports from "./ApproverReports";
import Profile from "../DataEntry/Profile";
import ExpiryDrugs from "./ExpiryDrugs";

const Approver = () => {
  const [profile, setProfile] = useState({});

  const userProfile = async () => {
    try {
      const { data } = await getUserProfile(getUserToken());
      setProfile(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Unexpected error occurred. Please try again");
        window.location = "/";
      } else {
        errorToast("Unexpected error occurred. Please try again");
        window.location = "/";
      }
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      <Header profile={profile} />
      <div className="row">
        <div className="col-md-12">
          <div className="container-fluid">
            <div className="row">
              <SideNav />
              <Route
                exact
                path="/tmda/approver/"
                component={() => <Dashboard profile={profile} />}
              />
              <Route
                path="/tmda/approver/unapproved-batch"
                component={() => <UnapprovedBatches profile={profile} />}
              />
              <Route
                path="/tmda/approver/reports"
                component={() => <ApproverReports profile={profile} />}
              />
              <Route
                path="/tmda/approver/profile"
                component={() => <Profile profile={profile} />}
              />
              <Route
                path="/tmda/approver/destroy"
                component={() => <ExpiryDrugs profile={profile} />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Approver;
