import http from "./baseUrl";

// User LOGIN function
export const login = (username, password) => {
    const authCredentials = {
        username: username,
        password: password
    }
    return http.post("/login/", authCredentials);
};

// User LOGOUT function
export const logout = () => {
    localStorage.removeItem('token');
};

// Store token to LOCALSTORAGE
export const setUserToken = (token) => {
  localStorage.setItem('token', token);
};

//GET stored User TOKEN from localstorage
export const getUserToken = () => {
  return localStorage.getItem('token');
};

// GET user profile
export const getUserProfile = (token) => {
    return http.get("/userprofile", {
        headers: {
            Authorization: `token ${token}`
        }
    });
};

//Return Authorization HEADERS
export const authHeaders = {
    headers: { Authorization: `token ${getUserToken()}` }
};