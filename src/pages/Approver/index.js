import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Header from "../../components/Header";
import SideNav from "./SideNav";
import Dashboard from "./Dashboard";
import UnapprovedBatches from "./UnapprovedBatches";
import ApproverReports from "./ApproverReports";

const Approver = () => {
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
                            <Route exact path="/tmda/approver/" component={() =>
                                <Dashboard profile={profile} />}
                            />
                            <Route path="/tmda/approver/unapproved-batch" component={() =>
                                <UnapprovedBatches profile={profile} />}
                            />
                            <Route path="/tmda/approver/reports" component={() =>
                                <ApproverReports profile={profile} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Approver;