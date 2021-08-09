import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Header from "../../components/Header";
import SideNav from "./SideNav";
import Dashboard from "./Dashboard";
import RegisterBatch from "./RegisterBatch";
import UnapprovedBatches from "./UnapprovedBatches";
import Reports from "./Reports";

const TMDA = () => {
    const [profile, setProfile] = useState({});

    const userProfile = async () => {
        try {
            const { data } = await getUserProfile(getUserToken());
            setProfile(data);
            console.log(data);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    useEffect(() => {
        userProfile();
    },[]);

    return (
        <>
            <Header profile={profile} />
            <div className="row">
                <div className="col-md-12">
                    <div className="container-fluid">
                        <div className="row">
                            <SideNav />
                            <Route exact path="/tmda/data-entry/" component={() => <Dashboard profile={profile} />} />
                            <Route path="/tmda/data-entry/register-batch" component={() => <RegisterBatch profile={profile} />} />
                            <Route path="/tmda/data-entry/unapproved-batch" component={() => <UnapprovedBatches profile={profile} />} />
                            <Route path="/tmda/data-entry/reports" component={() => <Reports profile={profile} />} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TMDA;