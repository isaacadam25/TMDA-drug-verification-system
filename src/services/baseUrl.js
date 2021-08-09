import axios from "axios";

const http = axios.create({
    baseURL: "/apis/v1/dts",
});

export default http;