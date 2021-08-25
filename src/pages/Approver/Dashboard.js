import React, { useState, useEffect } from "react";
import {
  getApprovedBatches,
  getUnapprovedBatches,
} from "../../services/batch.services";
import { errorToast } from "../../utils/notify";
import { formatDate } from "../../services/utilities.services";
import Content from "../../components/Content";

const Dashboard = (props) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingBatches, setPendingBatches] = useState([]);

  const { profile } = props;

  const getPendingBatches = async () => {
    try {
      const response = await getUnapprovedBatches();
      setPendingBatches(response.data);
      setPendingCount(response.data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorToast("Unexpected error occurred. Try again later.");
      } else {
        errorToast("Failed to load batches. Try reloading page.");
      }
    }
  };

  const getAcceptedBatches = async () => {
    try {
      const response = await getApprovedBatches();
      setAcceptedCount(response.data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorToast("Unexpected error occurred. Try again later.");
      } else {
        errorToast("Failed to load batches. Try reloading page.");
      }
    }
  };

  useEffect(() => {
    getPendingBatches();
    getAcceptedBatches();
  }, []);

  const { first_name, last_name } = profile;

  return (
    <Content title="Dashboard" profile={profile}>
      <div className="col-md-12">
        <h4 className="h4 p-2">
          Welcome {first_name} {last_name}
        </h4>
      </div>
      <div className="col-md-6">
        <div
          className="card border-dark "
          style={{ maxWidth: "32rem", marginLeft: 10 }}
        >
          <div className="card-body text-success">
            <h1 className="card-title text-center">{pendingCount}</h1>
          </div>
          <div className="card-footer text-center bg-transparent border-success">
            Pending Approval Batches
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card border-dark" style={{ maxWidth: "32rem" }}>
          <div className="card-body text-success">
            <h1 className="card-title text-center">{acceptedCount}</h1>
          </div>
          <div className="card-footer text-center bg-transparent border-success">
            Approved Batches Batches
          </div>
        </div>
      </div>
      <hr className="mt-3" />
      <div className="col-md-12">
        <h6 className="text-center p-2">Pending Approval Batches</h6>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Batch No</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Prod Date</th>
              <th scope="col">Exp Date</th>
              <th scope="col">Reg Date</th>
              <th scope="col">Unit</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingBatches.map((item) => (
              <tr key={item.id}>
                <td>{item.batch_number}</td>
                <td>{item.manufacturer}</td>
                <td>{item.production_date}</td>
                <td>{item.expiry_date}</td>
                <td>{formatDate(item.reg_date)}</td>
                <td>{item.unit_measure}</td>
                <td>{item.quantity_received}</td>
                <td>{item.quantity_received * item.unit_measure}</td>
                <td>
                  <em className="text-danger">
                    {item.status ? "Approved" : "Pending"}
                  </em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  );
};

export default Dashboard;
