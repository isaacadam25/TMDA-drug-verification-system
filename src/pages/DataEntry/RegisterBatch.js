import React, { useState, useEffect } from 'react';
import Content from "../../components/Content";
import AddBatchForm from "./AddBatchForm";
import { getUserProfile, getUserToken } from "../../services/auth.services";

const RegisterBatch = () => {
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
    },[])
    return (
        <>
            <Content title="Batch Registration" profile={profile}>
                <div className="col-md-12">
                    <AddBatchForm />
                </div>
            </Content>
        </>
    );
};

export default RegisterBatch;