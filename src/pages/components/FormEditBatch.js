import React from "react";
import Controller from "../../controllers";

function FormEditBatch(props) {
  const { data } = props;
  return (
    <form>
      <fieldset>
        <legend>Edit Batch Info</legend>
        <div className="row">
          <div className="col-6">
            <Controller.TextFieldController
              value={data.manufacturer}
              label="Manufacturer"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.drug_name}
              label="Medicine Name"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.medicine_type}
              label="Medicine Type"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.batch_number}
              label="Batch No"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.quantity_received}
              label="Quantity"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.unit_measure}
              label="Unit of measure"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              value={data.concentration}
              label="Concentration"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              type="date"
              value={data.production_date}
              label="Production Date"
            />
          </div>
          <div className="col-6">
            <Controller.TextFieldController
              type="date"
              value={data.expiry_date}
              label="Expiry Date"
            />
          </div>
          <div className="col-6">
            <Controller.TextareaController
              value={data.description}
              label="Description"
              placeholder="Add description..."
              defaultValue={data.description ? data.description : null}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-sm float-end">
              <i className="fa fa-refresh" /> Update Batch
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default FormEditBatch;
