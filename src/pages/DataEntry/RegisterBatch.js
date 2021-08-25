import React, { useState, useEffect } from "react";
import Content from "../../components/Content";
import AddBatchForm from "./AddBatchForm";
import { getUserProfile, getUserToken } from "../../services/auth.services";

const RegisterBatch = () => {
  const [profile, setProfile] = useState({});

  const userProfile = async () => {
    try {
      const { data } = await getUserProfile(getUserToken());
      setProfile(data);
    } catch (ex) {
      window.location = "/";
    }
  };

  useEffect(() => {
    userProfile();
  }, []);
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
