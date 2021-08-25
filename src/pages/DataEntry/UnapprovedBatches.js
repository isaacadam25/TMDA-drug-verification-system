import React, { useEffect, useState } from "react";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Content from "../../components/Content";
import BatchTable from "./BatchTable";

const UnapprovedBatches = () => {
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
    <Content title="Unapproved Batches" profile={profile}>
      <div className="col-md-12 p-2">
        <BatchTable />
      </div>
    </Content>
  );
};

export default UnapprovedBatches;
