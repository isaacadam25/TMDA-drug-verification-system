import React, {useEffect, useState} from 'react';
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Content from "../../components/Content";
import BatchTable from "./BatchTable";

const UnapprovedBatches = () => {
    const [profile, setProfile] = useState({});

    const userProfile = async () => {
        try {
            const response = await getUserProfile(getUserToken());
            setProfile(response.data);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    useEffect(() => {
        userProfile();
    },[]);

    return (
        <Content title="Unapproved Batches" profile={profile}>
            <div className="col-md-12 p-2">
                <h6 className="text-center p-2 border-bottom">Pending Approval Batches</h6>
                <BatchTable />
            </div>
        </Content>
    );
};

export default UnapprovedBatches;