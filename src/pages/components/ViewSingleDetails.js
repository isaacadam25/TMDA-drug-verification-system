import React from 'react';
import { getSingleUnapprovedBatch } from "../../services/batch.services";
import Controller from "../../controllers";

const ViewSingleDetails = (props) => {
    const { items } = props;



    return (
        <Controller.TableController>
            <tbody>
            <tr>
                <td><strong>Batch No</strong></td>
                <td>{items.batch_number}</td>
                <td><strong>Manufacturer</strong></td>
                <td>{items.manufacturer}</td>
            </tr>
            <tr>
                <td><strong>Unit of Measure</strong></td>
                <td>{items.unit_measure}</td>
                <td><strong>Concentration</strong></td>
                <td>{items.concentration}</td>
            </tr>
            <tr>
                <td><strong>Production Date</strong></td>
                <td>{items.production_date}</td>
                <td><strong>Expiry Date</strong></td>
                <td>{items.expiry_date}</td>
            </tr>
            <tr>
                <td><strong>Medicine Type</strong></td>
                <td>{items.medicine_type}</td>
                <td><strong>Approval Status</strong></td>
                <td className="text-danger"><b>
                    {
                        items.status ? "Approved" : "Pending"
                    }
                </b></td>
            </tr>
            <tr>
                <td><strong>Description</strong></td>
                <td colSpan={3}>{!items.description ? items.description : "Not Found"}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={4}>
                    <button data-bs-dismiss="modal"
                            className="btn btn-lg btn-outline-success float-end">OK</button>
                </td>
            </tr>
            </tfoot>
        </Controller.TableController>
    );
};

export default ViewSingleDetails;