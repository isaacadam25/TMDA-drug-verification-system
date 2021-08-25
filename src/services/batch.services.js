import http from "./baseUrl";
import { authHeaders } from "./auth.services";
import { formatDate } from "./utilities.services";

// POST new batch information
export const createBatch = (batchDetails) => {
  const batchInfo = {
    manufacturer: batchDetails.manufacturer,
    name: batchDetails.medicine_name,
    batch_number: batchDetails.batch_number,
    unit_of_measure: Number(batchDetails.unit_of_measure),
    concentration: `${batchDetails.concentration} mg`,
    production_date: formatDate(batchDetails.production_date),
    expiry_date: formatDate(batchDetails.expiry_date),
    medicine_type: Number(batchDetails.medicine_type),
    quantity_received: Number(batchDetails.quantity),
    description: batchDetails.description,
  };
  return http.post("/stock/batches/add", batchInfo, authHeaders);
};

// DELETE a single batch
export const deleteSingleBatch = (payload) => {
  return http.delete(`/stock/batches/${payload}`, authHeaders);
};

// UPDATE a single batch information
export const updateSingleBatch = (payload) => {
  return http.put(`/stock/batches/update/${payload.id}`, payload, authHeaders);
};

// GET unapproved BATCHES
export const getUnapprovedBatches = () => {
  return http.get("/stock/batches/unapproved", authHeaders);
};

export const getSingleUnapprovedBatch = (payload) => {
  return http.get(`/stock/batches/unapproved/${payload}`, authHeaders);
};

// GET approved BATCHES
export const getApprovedBatches = () => {
  return http.get("/stock/batches/approved", authHeaders);
};

// GET declined BATCHES
export const getDeclinedBatches = () => {
  return http.get("/stock/batches/declined", authHeaders);
};

//APPROVE BATCH
export const approveSingleBatch = (id, payload) => {
  return http.put(`stock/batches/approval-status/${id}`, payload, authHeaders);
};

//DECLINE BATCH
export const declineSingleBatch = (id, payload) => {
  return http.put(`/stock/batches/approval-status/${id}`, payload, authHeaders);
};

//GET expired BATCHES
export const getExpiredBatches = () => {
  return http.get("/report/batch/used/expired", authHeaders);
};
