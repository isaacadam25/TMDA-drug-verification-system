import React, { useState, useEffect } from "react";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import Content from "../../components/Content";
import { Image } from "react-bootstrap";

const Profile = () => {
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

  const { first_name, last_name, organization_name, title, is_active } =
    profile;

  return (
    <Content title="Profile" profile={profile}>
      <div className="row justify-content-center border m-1 p-3">
        <div className="col-md-4">
          <Image src="/images/avatar-2.png" thumbnail />
        </div>
        <div className="col-md-8">
          <table className="table table-hover table-striped table-bordered">
            <tbody>
              <tr>
                <td className="p-3">
                  <b>Full name:</b>
                </td>
                <td className="p-3">
                  {first_name} {last_name}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <b>Organization:</b>
                </td>
                <td className="p-3" style={{ textTransform: "uppercase" }}>
                  {organization_name}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <b>Designation:</b>
                </td>
                <td className="p-3" style={{ textTransform: "capitalize" }}>
                  {title}
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <b>Status:</b>
                </td>
                <td className="p-3">
                  {is_active ? (
                    <em className="text-success">Active</em>
                  ) : (
                    <em className="text-danger">Suspended</em>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

export default Profile;
