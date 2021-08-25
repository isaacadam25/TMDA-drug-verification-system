import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { errorToast, successToast } from "../../utils/notify";
import {
  getMedicineType,
  getMedicineDetails,
} from "../../services/medicine.services";
import { formatDate } from "../../services/utilities.services";
import { getActiveCompanies } from "../../services/manufacturer.services";
import { createBatch } from "../../services/batch.services";
import Controller from "../../controllers";

const initialValues = {
  batch_number: "",
  medicine_name: "",
  medicine_type: "",
  unit_of_measure: 0,
  concentration: 0,
  manufacturer: "",
  quantity: 0,
  description: "",
};

const mapCompanies = (company) => {
  return company.map((comp) => ({ id: comp.id, title: comp.name }));
};

const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

const mapDrugs = (drugs) => {
  return drugs.map((drug) => drug.name);
};

const mapDrugType = (drugs) => {
  return drugs.map((drug) => ({ id: drug.id, title: drug.type_name }));
};

const AddBatchForm = () => {
  const [values, setValues] = useState(initialValues);
  const [drugs, setDrugs] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [medicineType, setMedicineType] = useState([]);
  const [productionDate, setProductionDate] = useState(null);
  const [expiryDate, setExpiryDate] = useState(addDays(new Date(), 31));
  const [loading, setLoading] = useState(false);
  const [manufacturerError, setManufacturerError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [measureUnitError, setMeasureUnitError] = useState("");
  const [concentartionError, setConcentartionError] = useState("");
  const [medicineNameError, setMedicineNameError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [productionDateError, setProductionDateError] = useState("");
  const [drugTypeError, setDrugTypeError] = useState("");
  const [batchNumberError, setBatchNumberError] = useState("");

  //Function to handle form change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Function to handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      errorToast("There is an error. Please check your form fields.");
    } else {
      setLoading(false);
      setValues({
        ...values,
        production_date: productionDate,
        expiry_date: expiryDate,
      });
      try {
        await createBatch(values);
        successToast("Batch registered successfully");
        resetFormValues();
      } catch (ex) {
        if (ex.response.status < 500) {
          errorToast("Error occurred during registering batch.");
        } else {
          errorToast("Error occurred during registering batch.");
          console.log(ex.response);
        }
      }
    }
  };

  //Function to validate form
  const validateForm = () => {
    if (!values.manufacturer) {
      setManufacturerError("Manufacturer is required");
      return false;
    } else {
      setManufacturerError("");
    }
    if (!values.medicine_type) {
      setDrugTypeError("Medicine type is required");
      return false;
    } else {
      setDrugTypeError("");
    }
    if (values.batch_number.length < 4) {
      setBatchNumberError("Batch number must be at least 4 characters");
      return false;
    } else {
      setBatchNumberError("");
    }
    if (values.quantity <= 0) {
      setQuantityError("Quantity value must be greater than 0");
      return false;
    } else {
      setQuantityError("");
    }
    if (values.unit_of_measure <= 0) {
      setMeasureUnitError("Unit of measure value must be greater than 0");
      return false;
    } else {
      setMeasureUnitError("");
    }
    if (values.concentration <= 0) {
      setConcentartionError("Concentartion value must be greater than 0");
      return false;
    } else {
      setConcentartionError("");
    }
    if (!isString(values.medicine_name)) {
      setMedicineNameError("Medicine name must be text");
      return false;
    } else {
      setMedicineNameError("");
    }
    if (!productionDate) {
      setProductionDateError("Please select production date");
      return false;
    } else {
      setProductionDateError("");
    }
    if (!expiryDate) {
      setExpiryDateError("Please select expiry date");
      return false;
    } else {
      setExpiryDateError("");
    }
    return true;
  };

  //Function to get all drug types
  const getDrugTypes = async () => {
    try {
      const { data } = await getMedicineType();
      setMedicineType(mapDrugType(data));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  //function to reset form after submission
  const resetFormValues = () => {
    setValues(initialValues);
  };

  //Function to get all active manufacturers
  const getActiveManufacturers = async () => {
    try {
      const { data } = await getActiveCompanies();
      setManufacturer(mapCompanies(data));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  //Function to get all medicines
  const getMedicines = async () => {
    try {
      const { data } = await getMedicineDetails();
      setDrugs(mapDrugs(data));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  useEffect(() => {
    getDrugTypes();
    getActiveManufacturers();
    getMedicines();
  }, []);

  return (
    <>
      <h5 className="h5 p-2 text-center">New Batch Registration Form</h5>
      <form className="row g-2" onSubmit={handleSubmit}>
        <fieldset className="border p-3 rounded">
          <legend>Medicine Details:</legend>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Controller.DatalistController
                options={drugs}
                name="medicine_name"
                onChange={handleChange}
                value={values.medicine_name}
                label="Medicine name"
                invalidText={medicineNameError}
              />
            </div>
            <div className="col-md-4">
              <Controller.SelectController
                options={manufacturer}
                label="Manufacturer"
                name="manufacturer"
                onChange={handleChange}
                value={values.manufacturer}
                invalidText={manufacturerError}
              />
            </div>
            <div className="col-md-4">
              <Controller.SelectController
                options={medicineType}
                label="Medicine Type"
                name="medicine_type"
                onChange={handleChange}
                value={values.medicine_type}
                invalidText={drugTypeError}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="border p-3 rounded">
          <legend>Batch Details:</legend>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Controller.TextFieldController
                id="batchno"
                label="Batch No"
                name="batch_number"
                value={values.batch_number}
                onChange={handleChange}
                placeholder="Enter batch number"
                invalidText={batchNumberError}
              />
            </div>
            <div className="col-md-4">
              <Controller.TextFieldController
                id="quantity"
                type="number"
                label="Quantity"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                placeholder="Enter batch quantity"
                invalidText={quantityError}
              />
            </div>
            <div className="col-md-4">
              <Controller.TextFieldController
                id="unit_of_measure"
                type="number"
                label="Measure Unit"
                name="unit_of_measure"
                value={values.unit_of_measure}
                onChange={handleChange}
                placeholder="Enter unit of measure"
                invalidText={measureUnitError}
              />
            </div>
            <div className="col-md-4">
              <Controller.InputGroup
                type="number"
                label="Concentration"
                name="concentration"
                value={values.concentration}
                onChange={handleChange}
                group="mg"
                placeholder="Enter concentration"
                invalidText={concentartionError}
              />
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label htmlFor="production_date" className="form-label">
                  Production Date
                </label>
                <DatePicker
                  selected={productionDate}
                  className="form-control form-control-sm"
                  dateFormat="yyyy-MM-dd"
                  maxDate={new Date()}
                  placeholderText="Click to select production date"
                  onChange={(date) => setProductionDate(date)}
                />
                <div className="text-danger">{productionDateError}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-2">
                <label htmlFor="production_date" className="form-label">
                  Expiry Date
                </label>
                <DatePicker
                  selected={expiryDate}
                  className="form-control form-control-sm"
                  dateFormat="yyyy-MM-dd"
                  minDate={addDays(new Date(), 31)}
                  placeholderText="Click to select expiry date"
                  onChange={(date) => setExpiryDate(date)}
                />
                <div className="text-danger">{expiryDateError}</div>
              </div>
            </div>
            <div className="col-md-12">
              <Controller.TextareaController
                id="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                name="description"
              />
            </div>
            <div className="col-md-12 pt-1">
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary float-end btn-sm"
                >
                  <i className="fa fa-save" />
                  &nbsp; Save Info
                </button>
              )}
              <button
                type="reset"
                className="btn btn-sm btn-warning float-start"
              >
                <i className="fa fa-refresh" />
                &nbsp; Reset Info
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AddBatchForm;
