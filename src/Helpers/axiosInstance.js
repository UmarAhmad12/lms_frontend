import axios from "axios";

const BASE_URL = "https://cors-anywhere.herokuapp.com/https://lms-backend-sage-ten.vercel.app/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = false;

export default axiosInstance;
