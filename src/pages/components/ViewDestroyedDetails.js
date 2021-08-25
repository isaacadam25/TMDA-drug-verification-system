import React, { useState } from "react";
import { errorToast, successToast, warningToast } from "../../utils/notify";
import { sendValue } from "../../services/medicine.services";
import TableController from "../../controllers/TableController";
import TableHeadController from "../../controllers/TableHeadController";
import TextFieldController from "../../controllers/TextFieldController";

const headCells = [
  { id: 1, title: "Batch no" },
  { id: 4, title: "Drug type" },
];

const ViewDestroyedDetails = (props) => {
  const [value, setValue] = useState(0);
  const [valueError, setValueError] = useState("");

  const { destroyed, total, instituteId, userId, handleClose } = props;

  const validate = () => {
    if (Number(value) > total || isNaN(value) || Number(value) <= 0) {
      setValueError("Value is not valid");
      return false;
    } else {
      setValueError("");
    }
    return true;
  };

  const formSubmit = async () => {
    const payload = {
      quantity_destroyed: value,
      organization: instituteId,
      quantity_needed: total,
      user: userId,
    };
    if (!validate()) {
      warningToast("There is error in your form fields. Please check it.");
    } else {
      try {
        await sendValue(payload);
        successToast("Drugs destroyed successfully.");
        handleClose();
      } catch (ex) {
        if (ex.response.status >= 500) {
          errorToast("An unexpected error occurred. PLease try again.");
        } else {
          warningToast("Failed to destroy drugs. Try after some time.");
        }
        console.log(ex.response);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <h5 className="h5 text-center p-2">Destroyed drugs details</h5>
        <TableController>
          <TableHeadController headcells={headCells} />
          <tbody>
            {destroyed &&
              destroyed.map((data, index) => (
                <tr key={index}>
                  <td>{data.batch_number}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {data.unit_measure}
                  </td>
                </tr>
              ))}
          </tbody>
        </TableController>
      </div>
      <div className="col-md-8">
        <TextFieldController
          label="Total drugs destroyed"
          onChange={(e) => setValue(e.target.value)}
          invalidText={valueError}
        />
        <button
          onClick={formSubmit}
          className="btn btn-primary btn-sm float-end"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewDestroyedDetails;
