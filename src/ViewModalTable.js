import React, { useState } from "react";
import Controller from "./controllers";

const ViewModalTable = (props) => {
  const [reason, setReason] = useState("");

  const { items, declined, declineBatch, approveBatch, setDeclined } = props;

  return (
    <Controller.TableController>
      <tbody>
        <tr>
          <td>
            <strong>Batch No</strong>
          </td>
          <td>{items.batch_number}</td>
          <td>
            <strong>Manufacturer</strong>
          </td>
          <td>{items.manufacturer}</td>
        </tr>
        <tr>
          <td>
            <strong>Unit of Measure</strong>
          </td>
          <td>{items.unit_measure}</td>
          <td>
            <strong>Concentration</strong>
          </td>
          <td>{items.concentration}</td>
        </tr>
        <tr>
          <td>
            <strong>Production Date</strong>
          </td>
          <td>{items.production_date}</td>
          <td>
            <strong>Expiry Date</strong>
          </td>
          <td>{items.expiry_date}</td>
        </tr>
        <tr>
          <td>
            <strong>Medicine Type</strong>
          </td>
          <td>{items.medicine_type}</td>
          <td>
            <strong>Approval Status</strong>
          </td>
          <td className="text-danger">
            <em>{items.status ? "Approved" : "Pending"}</em>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Description</strong>
          </td>
          <td colSpan={3}>
            {items.description ? items.description : "No description found"}
          </td>
        </tr>
        {declined ? (
          <tr>
            <td colSpan={4}>
              <Controller.TextareaController
                onChange={(e) => setReason(e.target.value)}
                label="Batch Problem Description"
              />
            </td>
          </tr>
        ) : null}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            {declined ? (
              <button
                onClick={() => {
                  if (window.confirm("Are you sure?"))
                    declineBatch(items.id, reason);
                }}
                className="btn btn-sm btn-danger float-end"
                data-bs-dismiss="modal"
              >
                Decline Batch
              </button>
            ) : (
              <button
                onClick={() => setDeclined(true)}
                className="btn btn-sm btn-warning float-start"
              >
                Decline Batch
              </button>
            )}
            {declined ? null : (
              <button
                data-bs-dismiss="modal"
                className="btn btn-sm btn-primary float-end"
                onClick={() => {
                  if (window.confirm("Are you sure?")) approveBatch(items.id);
                }}
              >
                Approve Batch
              </button>
            )}
          </td>
        </tr>
      </tfoot>
    </Controller.TableController>
  );
};

export default ViewModalTable;
