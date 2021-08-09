import React, { useState, useEffect } from 'react';
import { getUserProfile, getUserToken } from "../../services/auth.services";
import { getUnapprovedBatches, getApprovedBatches } from "../../services/batch.services";
import Content from "../../components/Content";

const Dashboard = () => {
    const [profile, setProfile] = useState({});
    const [pendingBatches, setPendingBatches] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);

    const userProfile = async () => {
      try {
          const response = await getUserProfile(getUserToken());
          setProfile(response.data);
      } catch (ex) {
          console.log(ex.response);
      }
    };

    const getPendingBatches = async () => {
      try {
          const response = await getUnapprovedBatches();
          setPendingBatches(response.data);
          setPendingCount(response.data.length);
      } catch (ex) {
          console.log(ex.response);
      }
    };

    const getAcceptedBatches = async () => {
      try {
          const response = await getApprovedBatches();
          setAcceptedCount(response.data.length);
      } catch (ex) {
          console.log(ex.response);
      }
    };

    useEffect(() => {
        userProfile();
        getPendingBatches();
        getAcceptedBatches();
    }, []);

    return (
        <Content title="Dashboard" profile={profile} >
            <div className="col-md-4">
                <div className="card" style={{ maxWidth: "32rem", marginLeft: 10, border: "4px solid #bed63d" }}>
                    <div className="card-body">
                        <h5 className="card-title">{pendingCount}</h5>
                        <p className="text-muted"> Pending Approval Batches</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card" style={{ maxWidth: "32rem", border: "4px solid #bed63d"}}>
                    <div className="card-body">
                        <h5 className="card-title"> {acceptedCount}</h5>
                        <p className="text-muted"> Approved Batches</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card" style={{ maxWidth: "32rem", border: "4px solid #bed63d"}}>
                    <div className="card-body">
                        <h5 className="card-title"> {acceptedCount + pendingCount}</h5>
                        <p className="text-muted"> All Batches</p>
                    </div>
                </div>
            </div>
            <div className="col-md-12 m-3 border-top">
                <h6 className="text-center p-2">Pending Approval Batches</h6>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Batch No</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Production Date</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Registration Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Approval Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pendingBatches.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.batch_number}</td>
                                    <td>{item.manufacturer}</td>
                                    <td>{item.production_date}</td>
                                    <td>{item.expiry_date}</td>
                                    <td>{item.production_date}</td>
                                    <td>{item.quantity_received}</td>
                                    <td>
                                        <strong className="text-danger">{item.status ? "Approved": "Pending"}</strong>
                                    </td>
                                </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </Content>
    );
};

export default Dashboard;