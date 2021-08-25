import React, { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import { formatDate } from "../../services/utilities.services";
import {
  approveSingleBatch,
  getSingleUnapprovedBatch,
  getUnapprovedBatches,
  declineSingleBatch,
} from "../../services/batch.services";
import Controller from "../../controllers";
import ViewModalTable from "../../ViewModalTable";

const headCells = [
  { id: 1, title: "Batch No" },
  { id: 2, title: "Production Date" },
  { id: 3, title: "Expiry Date" },
  { id: 4, title: "Registration Date" },
  { id: 5, title: "Batch Quantity" },
  { id: 6, title: "Approval Status" },
  { id: 7, title: "Action" },
];

const UnapprovedBatchTable = () => {
  const [records, setRecords] = useState([]);
  const [batches, setBatches] = useState({});
  const [declined, setDeclined] = useState(false);
  const [paginate, setPaginate] = useState({ pageSize: 5, currentPage: 1 });

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    records,
    paginate.currentPage,
    paginate.pageSize
  );

  const getPendingBatches = async () => {
    try {
      const { data } = await getUnapprovedBatches();
      setRecords(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const showDialog = (id) => {
    getSingleBatch(id);
  };

  const declineBatch = async (batchId, reason) => {
    setDeclined(true);
    const payload = {
      id: batchId,
      is_declined: true,
      description: reason,
    };
    try {
      const response = await declineSingleBatch(batchId, payload);
      await getPendingBatches();
      console.log(response);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const approveBatch = async (batchId) => {
    const payload = {
      id: batchId,
      status: true,
      date_approved: formatDate(new Date()),
    };
    try {
      const response = await approveSingleBatch(batchId, payload);
      await getPendingBatches();
      console.log(response);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const getSingleBatch = async (id) => {
    try {
      const { data } = await getSingleUnapprovedBatch(id);
      setBatches(data);
      console.log(data);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    getPendingBatches();
  }, []);

  return (
    <>
      <Controller.TableController>
        <Controller.TableHeadController headcells={headCells} />
        <tbody>
          {recordsData &&
            recordsData.map((record) => (
              <tr key={record.id}>
                <td>{record.batch_number}</td>
                <td>{record.production_date}</td>
                <td>{record.expiry_date}</td>
                <td>{record.expiry_date}</td>
                <td>{record.quantity_received}</td>
                <td>
                  <strong className="text-danger">
                    {record.status ? "Approved" : "Pending"}
                  </strong>
                </td>
                <td>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#viewBatch"
                    className="btn btn-outline-info btn-sm"
                    onClick={() => showDialog(record.id)}
                  >
                    <i style={{ fontSize: 18 }} className="fa fa-eye" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Controller.TableController>
      <Pagination
        itemsCount={records.length}
        currentPage={paginate.currentPage}
        pageSize={paginate.pageSize}
        onPageChange={handlePageChange}
      />

      <div
        className="modal fade"
        id="viewBatch"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Batch Details</h5>
              <button
                type="button"
                className="btn-outline-danger btn-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-close" />
              </button>
            </div>
            <div className="modal-body">
              <ViewModalTable
                items={batches}
                declined={declined}
                declineBatch={declineBatch}
                approveBatch={approveBatch}
                setDeclined={setDeclined}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnapprovedBatchTable;
