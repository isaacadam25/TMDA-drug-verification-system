import React, { useState, useEffect } from "react";
import { errorToast } from "../../utils/notify";
import { formatDate } from "../../services/utilities.services";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import {
  getUnapprovedBatches,
  getApprovedBatches,
} from "../../services/batch.services";
import Content from "../../components/Content";

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [pendingBatches, setPendingBatches] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [paginate, setPaginate] = useState({ pageSize: 8, currentPage: 1 });

  const userProfile = async () => {
    try {
      const { data } = await getUserProfile(getUserToken());
      setProfile(data);
    } catch (ex) {
      window.location = "/";
    }
  };

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    pendingBatches,
    paginate.currentPage,
    paginate.pageSize
  );

  const getPendingBatches = async () => {
    try {
      const { data } = await getUnapprovedBatches();
      setPendingBatches(data);
      setPendingCount(data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorToast("Unexpected error occured during fetching batches.");
      } else {
        errorToast("Error occurred. Please try again later.");
      }
    }
  };

  const getAcceptedBatches = async () => {
    try {
      const { data } = await getApprovedBatches();
      setAcceptedCount(data.length);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorToast("Unexpected error occured.");
      } else {
        errorToast("Error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    userProfile();
    getPendingBatches();
    getAcceptedBatches();
  }, []);

  const { first_name, last_name } = profile;

  return (
    <Content title="Dashboard" profile={profile}>
      <div className="col-md-12 pb-3">
        <h4 style={{ marginLeft: 16 }} className="h4">
          Welcome {first_name} {last_name}
        </h4>
      </div>
      <div className="col-md-4">
        <div
          className="card"
          style={{
            maxWidth: "32rem",
            marginLeft: 10,
            border: "4px solid #bed63d",
          }}
        >
          <div className="card-body">
            <h3 className="card-title">{pendingCount}</h3>
            <p className="text-muted"> Pending Approval Batches</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div
          className="card"
          style={{ maxWidth: "32rem", border: "4px solid #bed63d" }}
        >
          <div className="card-body">
            <h3 className="card-title"> {acceptedCount}</h3>
            <p className="text-muted"> Approved Batches</p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div
          className="card"
          style={{ maxWidth: "32rem", border: "4px solid #bed63d" }}
        >
          <div className="card-body">
            <h3 className="card-title"> {acceptedCount + pendingCount}</h3>
            <p className="text-muted"> All Batches</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="col-md-12">
        <h6 className="text-center p-1">Unapproved Batches</h6>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
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
            {recordsData &&
              recordsData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.batch_number}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.production_date}</td>
                  <td>{item.expiry_date}</td>
                  <td>{formatDate(item.reg_date)}</td>
                  <td>{item.unit_measure}</td>
                  <td>{item.quantity_received}</td>
                  <td>{item.quantity_received * item.unit_measure}</td>
                  <td>
                    {item.status ? (
                      <em className="text-success">Approved</em>
                    ) : (
                      <em className="text-danger">Pending</em>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={pendingBatches.length}
          currentPage={paginate.currentPage}
          pageSize={paginate.pageSize}
          onPageChange={handlePageChange}
        />
        {recordsData.length === 0 && (
          <p className="text-center">
            <i>No Data Found</i>
          </p>
        )}
      </div>
    </Content>
  );
};

export default Dashboard;
