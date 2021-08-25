import http from "./baseUrl";
import { authHeaders } from "./auth.services";

//top APPROVED manufacturers
export const getTopManufacturers = () => {
  return http.get("/report/manufacturers/approved", authHeaders);
};

//top APPROVED medicines
export const getTopMedicines = () => {
  return http.get("/report/drugs/top-approved", authHeaders);
};
