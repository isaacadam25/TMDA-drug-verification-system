import React, { useState, useEffect } from 'react';
import { formatDate } from "../../services/utilities.services";
import { getMedicineType, getDrugDetails, registerMedicine } from "../../services/medicine.services";
import { addNewBatch } from "../../services/batch.services";
import Controller from "../../controllers";

const initialValues = {
    batch_number: "",
    medicine_name: "",
    medicine_type: "",
    unit_of_measure: 0,
    concentration: "",
    expiry_date: formatDate(new Date()),
    production_date: formatDate(new Date()),
    manufacturer: "",
    quantity: 0,
    description: "",
}

const AddBatchForm = () => {
    const [values, setValues] = useState(initialValues);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const addDrugDetails = await registerMedicine(values);
            if (addDrugDetails.status === 201) {
                try {
                    const latestDrug = await getDrugDetails();
                    const drugId = latestDrug.data.id;
                    if (latestDrug.status === 200) {
                        const newBatch = await addNewBatch({
                            medicine_detail: drugId,
                            ...values,
                        });
                        setLoading(false);
                        setSuccess(true);
                        resetFormValues();
                        console.log(newBatch);
                    }
                } catch (ex) {
                    if (ex) setError(true);
                }
            }
        } catch (ex) {
            if (ex) setError(true);
        }
    };

    const getDrugTypes = async () => {
      try {
          const response = await getMedicineType();
          setOptions(response.data);
      } catch (ex) {
          console.log(ex.response);
      }
    };

    const resetFormValues = () => {
        setValues(initialValues);
    };

    useEffect(() => {
        getDrugTypes();
    }, []);

    return (
        <>
            <h5 className="h5 p-1 text-center border-bottom">New Batch Registration Form</h5>
            {
                error ? (<Controller.AlertController />) : null
            }
            {
                success ? (<Controller.AlertSuccessController />) : null
            }
            <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="batchno"
                        label="Batch No"
                        name="batch_number"
                        value={values.batch_number}
                        onChange={handleChange}
                        placeholder="Enter batch number"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="medicineName"
                        label="Medicine Name"
                        name="medicine_name"
                        value={values.medicine_name}
                        onChange={handleChange}
                        placeholder="Enter medicine name"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="quantity"
                        label="Quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleChange}
                        placeholder="Enter batch quantity"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="unit_of_measure"
                        label="Measure Unit"
                        name="unit_of_measure"
                        value={values.unit_of_measure}
                        onChange={handleChange}
                        placeholder="Enter unit of measure"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="concentration"
                        label="Concentration"
                        name="concentration"
                        value={values.concentration}
                        onChange={handleChange}
                        placeholder="Enter medicine concentration"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="manufacturer"
                        label="Manufacturer"
                        name="manufacturer"
                        value={values.manufacturer}
                        onChange={handleChange}
                        placeholder="Enter medicine manufacturer"
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="production_date"
                        label="Production date"
                        type="date"
                        onChange={handleChange}
                        name="production_date"
                        value={values.production_date}
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextFieldController
                        id="expiry_date"
                        label="Expiry Date"
                        type="date"
                        onChange={handleChange}
                        name="expiry_date"
                        value={values.expiry_date}
                    />
                </div>
                <div className="col-md-6">
                    <Controller.SelectController
                        label="Medicine Type"
                        name="medicine_type"
                        value={values.medicine_type}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <div className="col-md-6">
                    <Controller.TextareaController
                        id="description"
                        label="Description"
                        onChange={handleChange}
                        value={values.description}
                        name="description"
                    />
                </div>
                <div className="col-md-12 border-bottom p-2">
                        {
                            loading ? (
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true" />
                                    <span className="visually-hidden">Loading...</span>
                                </button>
                            ) : (<button className="btn btn-primary float-end btn-sm">Save Batch Info</button>)
                        }
                    <button className="btn btn-sm btn-danger float-start">Reset Info</button>
                </div>
            </form>
        </>
    );
};

export default AddBatchForm;