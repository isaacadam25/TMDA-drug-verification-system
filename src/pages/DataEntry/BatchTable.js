import React, { useState, useEffect } from 'react';
import { getSingleUnapprovedBatch, getUnapprovedBatches } from "../../services/batch.services";
import Controller from "../../controllers";
import ViewSingleDetails from "../components/ViewSingleDetails";

const headCells = [
    {id: 1, title: "Batch No"},
    {id: 2, title: "Production Date"},
    {id: 3, title: "Expiry Date"},
    {id: 4, title: "Registration Date"},
    {id: 5, title: "Batch Quantity"},
    {id: 6, title: "Approval Status"},
    {id: 7, title: "Action"},
];

const BatchTable = () => {
    const [records, setRecords] = useState([]);
    const [batchDetails, setBatchDetails] = useState({});

    const getPendingBatches = async () => {
      try {
          const { data } = await getUnapprovedBatches();
          setRecords(data);
          console.log(data);
      } catch (ex) {
          console.log(ex.response)
      }
    };

    const showDialog = (id) => {
      getSingleBatch(id);
    };

    const getSingleBatch = async (batchId) => {
        try {
            const { data } = await getSingleUnapprovedBatch(batchId);
            setBatchDetails(data)
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
                {
                    records.map((record, index) => (
                        <tr key={record.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{record.batch_number}</td>
                            <td>{record.production_date}</td>
                            <td>{record.expiry_date}</td>
                            <td>{record.expiry_date}</td>
                            <td>{record.quantity_received}</td>
                            <td>
                                <strong className="text-danger">{record.status ? "Approved" : "Pending" }</strong>
                            </td>
                            <td>
                                <button data-bs-toggle="modal"
                                        data-bs-target="#viewBatch"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => showDialog(record.id)}
                                >
                                    <i className="fa fa-eye" /> View</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Controller.TableController>

            <div className="modal fade" id="viewBatch" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Batch Details</h5>
                            <button type="button" className="btn-outline-danger btn-sm" data-bs-dismiss="modal"
                                    aria-label="Close"><i className="fa fa-close" /></button>
                        </div>
                        <div className="modal-body">
                            <ViewSingleDetails items={batchDetails} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BatchTable;