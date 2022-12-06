import axios from "axios";

export const axiosIns = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});