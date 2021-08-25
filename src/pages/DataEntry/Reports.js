import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import {
  getDeclinedBatches,
  getSingleUnapprovedBatch,
} from "../../services/batch.services";
import Content from "../../components/Content";
import Controller from "../../controllers";
import ReportsHeader from "../components/ReportsHeader";
import ViewSingleDetails from "../components/ViewSingleDetails";
import { Spinner } from "react-bootstrap";

const headCells = [
  { id: 0, title: "Batch No" },
  { id: 1, title: "Medicine Name" },
  { id: 2, title: "Quantity" },
  { id: 3, title: "Prod Date" },
  { id: 4, title: "Expiry Date" },
  { id: 5, title: "Action" },
];

const Reports = () => {
  const [profile, setProfile] = useState({});
  const [declined, setDeclined] = useState([]);
  const [paginate, setPaginate] = useState({ pageSize: 8, currentPage: 1 });
  const [singleDeclined, setSingleDeclined] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  const showDialog = async (id) => {
    setShow(true);
    try {
      const { data } = await getSingleUnapprovedBatch(id);
      setSingleDeclined(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const userProfile = async () => {
    try {
      const { data } = await getUserProfile(getUserToken());
      setProfile(data);
    } catch (ex) {
      window.location = "/";
    }
  };

  const getDeclined = async () => {
    try {
      const { data } = await getDeclinedBatches();
      setDeclined(data);
      setLoading(false);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    userProfile();
    getDeclined();
  }, []);

  if (loading) {
    return (
      <Content title="Reports" profile={profile}>
        <div className="col-md-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Content>
    );
  }

  const headers = [
    { label: "Batch No", key: "batch_number" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Medicine", key: "drug_name" },
    { label: "Qantity", key: "quantity_received" },
    { label: "Prod Date", key: "production_date" },
    { label: "Exp Date", key: "expiry_date" },
  ];

  const csvReport = {
    data: declined,
    headers: headers,
    filename: "Declined_Report.csv",
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    declined,
    paginate.currentPage,
    paginate.pageSize
  );

  return (
    <Content title="Reports" profile={profile}>
      <ReportsHeader />
      <div className="col-md-12 border">
        <h5 className="h5 text-center p-2">Declined Batches</h5>
        {declined.length > 0 && (
          <CSVLink
            className="btn btn-outline-primary btn-sm float-end"
            {...csvReport}
            style={{ marginRight: 24 }}
          >
            <i className="fa fa-file-excel-o" /> Export
          </CSVLink>
        )}

        <Controller.TableController>
          <Controller.TableHeadController headcells={headCells} />
          <tbody>
            {recordsData &&
              recordsData.map((data) => (
                <tr>
                  <td>{data.batch_number}</td>
                  <td>{data.drug_name}</td>
                  <td>{data.quantity_received}</td>
                  <td>{data.production_date}</td>
                  <td>{data.expiry_date}</td>
                  <td>
                    <button
                      onClick={() => showDialog(data.id)}
                      className="btn btn-sm  btn-outline-info"
                    >
                      <i className="fa fa-eye" /> View
                    </button>
                    <button
                      onClick={() => showDialog(data.id)}
                      className="btn btn-sm  btn-outline-dark"
                      style={{ marginLeft: 16 }}
                    >
                      <i className="fa fa-print" /> Print Row
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Controller.TableController>

        {recordsData.length === 0 && (
          <p className="text-center">
            <i>No Data Found</i>
          </p>
        )}

        <Pagination
          itemsCount={declined.length}
          currentPage={paginate.currentPage}
          pageSize={paginate.pageSize}
          onPageChange={handlePageChange}
        />

        {/* Popup modal */}
        <Controller.ModalController show={show} setShow={setShow} btnText="Ok">
          <ViewSingleDetails items={singleDeclined} />
        </Controller.ModalController>
      </div>
    </Content>
  );
};

export default Reports;
