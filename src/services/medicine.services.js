import http from "./baseUrl";
import { authHeaders } from "./auth.services";

/* Function to add new Drug details */
export const addNewDrugDetails = (quantity, batchNo) => {
  const drug = {
    quantity: quantity,
    batch: batchNo,
  };
  return http.post("/stock/medicine", drug, authHeaders);
};

/* Function to register new drug */
export const registerMedicine = ({ medicine_name, manufacturer }) => {
  const drug = {
    name: medicine_name,
    manufacturer: manufacturer,
  };
  return http.post("/stock/medicine-info", drug, authHeaders);
};

/* Function to retrieve all drug details */
export const getMedicineDetails = () => {
  return http.get("/stock/medicine-info", authHeaders);
};

/* Function to retrieve latest drug details */
export const getDrugDetails = () => {
  return http.get("/stock/medicine-latest", authHeaders);
};

/* Function to retrieve medicine types */
export const getMedicineType = () => {
  return http.get("/stock/medicine-type", authHeaders);
};

/* Function to retrieve medicine types */
export const getAllintitutions = () => {
  return http.get("/hub/destinations/", authHeaders);
};

/* Function to retrieve medicine types */
export const getSingleintitution = (refNo) => {
  return http.get(`/hub/institute/name/${refNo}`, authHeaders);
};

/* Function to retrieve medicine types */
export const getDestroyedDrugs = (refNo) => {
  return http.get(`/report/batch/track/need-destroy/${refNo}`, authHeaders);
};

/* Function to retrieve medicine types */
export const sendValue = (payload) => {
  return http.post(`/report/batch/track/destroy-api`, payload, authHeaders);
};
