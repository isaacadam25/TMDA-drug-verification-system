import React from "react";
import Controller from "../../controllers";

const ViewSingleDetails = (props) => {
  const { items } = props;

  if (!items) {
    return <h6 className="h6 text-center">No Data Found</h6>;
  }

  return (
    <>
      <h5 className="h5 text-center p-2">Batch Details</h5>
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
              <strong>Concentration</strong>
            </td>
            <td>{items.concentration}</td>
            <td>
              <strong>Medicine Type</strong>
            </td>
            <td>{items.medicine_type}</td>
          </tr>
          <tr>
            <td>
              <strong>Unit of Measure</strong>
            </td>
            <td>{items.unit_measure}</td>
            <td>
              <strong>Quantity</strong>
            </td>
            <td>{items.quantity_received}</td>
          </tr>
          <tr>
            <td>
              <strong>Total Drugs</strong>
            </td>
            <td>{items.quantity_received * items.unit_measure}</td>
            <td>
              <strong>Approval Status</strong>
            </td>
            <td className="text-danger">
              <p>{items.is_declined ? "Declined" : "Not Found"}</p>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Decline Reason</strong>
            </td>
            <td colSpan={3}>
              {items.description ? items.description : "Not Found"}
            </td>
          </tr>
        </tbody>
      </Controller.TableController>
    </>
  );
};

export default ViewSingleDetails;
