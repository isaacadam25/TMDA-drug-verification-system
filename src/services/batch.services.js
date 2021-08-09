import http from "./baseUrl";
import { authHeaders } from "./auth.services";
import { formatDate } from "./utilities.services";

// Function to add new batch information
export const addNewBatch = (batchDetails) => {
    const batchInfo = {
        medicine_detail: batchDetails.medicine_detail,
        batch_number: batchDetails.batch_number,
        unit_of_measure: batchDetails.unit_of_measure,
        concentration: batchDetails.concentration,
        production_date: formatDate(batchDetails.production_date),
        expiry_date: formatDate(batchDetails.expiry_date),
        medicine_type: batchDetails.medicine_type,
        quantity_received: batchDetails.quantity,
        description: batchDetails.description,
    };
    return http.post("/stock/batches", batchInfo, authHeaders);
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
    return http.put(`stock/batches/approval-status/${id}`, payload, authHeaders);
};