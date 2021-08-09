import http from "./baseUrl";
import { authHeaders } from "./auth.services";

// Function to add new Drug details
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

// Function to retrieve drug details
export const getDrugDetails = () => {
    return http.get("/stock/medicine-latest", authHeaders);
};

// Function to retrieve medicine types
export const getMedicineType = () => {
    return http.get("/stock/medicine-type", authHeaders);
};