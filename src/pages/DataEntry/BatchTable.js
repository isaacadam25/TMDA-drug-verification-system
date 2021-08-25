import React, { useState, useEffect } from "react";
import {
  getSingleUnapprovedBatch,
  getUnapprovedBatches,
  deleteSingleBatch,
} from "../../services/batch.services";
import { formatDate } from "../../services/utilities.services";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import { errorToast } from "../../utils/notify";
import Controller from "../../controllers";
import FormEditBatch from "../components/FormEditBatch";

const headCells = [
  { id: 0, title: "Batch No" },
  { id: 1, title: "Manufacturer" },
  { id: 2, title: "Prod Date" },
  { id: 3, title: "Exp Date" },
  { id: 4, title: "Reg Date" },
  { id: 5, title: "Unit" },
  { id: 6, title: "Quantity" },
  { id: 7, title: "Total" },
  { id: 8, title: "Status" },
  { id: 9, title: "Action" },
];

const BatchTable = () => {
  const [records, setRecords] = useState([]);
  const [batchDetails, setBatchDetails] = useState({});
  const [paginate, setPaginate] = useState({ pageSize: 8, currentPage: 1 });
  const [show, setShow] = useState(false);

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* show POPUP MODAL */
  const showDialog = (id) => {
    getSingleBatch(id);
    setShow(true);
  };

  /* get pending BATCHES */
  const getPendingBatches = async () => {
    try {
      const { data } = await getUnapprovedBatches();
      setRecords(data);
    } catch (ex) {
      if (Number(ex.response.status) >= 500) {
        errorToast("Error occurred while fetching batches.");
      } else {
        errorToast("Error occurred while fetching batches.");
      }
    }
  };

  /* Delete BATCH details */
  const deleteBatchDetails = async (id) => {
    const originalBatch = records;
    const batches = records.filter((batch) => batch.id !== id);
    setRecords(batches);
    try {
      const response = await deleteSingleBatch(id);
      console.log(response);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Unexpected Error Occurred. Plaese try again");
      } else {
        errorToast("Batch already deleted.");
      }
      setRecords(originalBatch);
    }
  };

  /* get single BATCH details */
  const getSingleBatch = async (batchId) => {
    try {
      const { data } = await getSingleUnapprovedBatch(batchId);
      setBatchDetails(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Error occurred while fetching batches. Plaese try again");
      } else {
        errorToast("Error occurred while fetching batches. Plaese try again");
      }
    }
  };

  /* Paginate data in tables */
  const recordsData = Paginate(
    records,
    paginate.currentPage,
    paginate.pageSize
  );

  /* get pending BATCHES on page loads */
  useEffect(() => {
    getPendingBatches();
  }, []);

  return (
    <>
      <h5 className="h5 text-center p-2">Unapproved Batches</h5>
      <Controller.TableController>
        <Controller.TableHeadController headcells={headCells} />
        <tbody>
          {recordsData &&
            recordsData.map((record) => (
              <tr key={record.id}>
                <td>{record.batch_number}</td>
                <td>{record.manufacturer}</td>
                <td>{record.production_date}</td>
                <td>{record.expiry_date}</td>
                <td>{formatDate(record.reg_date)}</td>
                <td>{record.unit_measure}</td>
                <td>{record.quantity_received}</td>
                <td>{record.quantity_received * record.unit_measure}</td>
                <td>
                  <em className="text-danger">
                    {record.status ? "Approved" : "Pending"}
                  </em>
                </td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => showDialog(record.id)}
                  >
                    <i className="fa fa-edit" />
                  </button>
                  <button
                    style={{ marginLeft: 16 }}
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Are you sure want to delete?"))
                        deleteBatchDetails(record.id);
                    }}
                  >
                    <i className="fa fa-trash" />
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
      {recordsData.length === 0 && (
        <p className="text-center">
          <i>No Data Found</i>
        </p>
      )}

      <Controller.ModalController
        setShow={setShow}
        btnText="Cancel"
        show={show}
      >
        <FormEditBatch data={batchDetails} />
      </Controller.ModalController>
    </>
  );
};

export default BatchTable;
