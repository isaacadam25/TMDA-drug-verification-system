import http from "./baseUrl";
import { authHeaders } from "./auth.services";

//create a COMPANY
export const createCompany = (payload) => {
  return http.post("/stock/batches/manufacturer", payload, authHeaders);
};

//get all COMPANIES
export const getAllCompanies = () => {
  return http.get("/stock/batches/manufacturer", authHeaders);
};

//get All ACTIVE companies
export const getActiveCompanies = () => {
  return http.get("/stock/batches/manufacturer/active", authHeaders);
};

// get all SUSPENDED companies
export const getInactiveCompanies = () => {
  return http.get("/stock/batches/manufacturer/suspended", authHeaders);
};

//SUSPEND a company
export const suspendCompany = (payload) => {
  return http.put(
    `/stock/batches/manufacturer/${payload.id}`,
    payload,
    authHeaders
  );
};
