import axios from "axios";
import { API_ENDPOINT_URL } from "./apiEndPoint";

// Create an Axios instance with custom configuration
const axiosApi = axios.create({
  baseURL: API_ENDPOINT_URL, // Set the base URL for all requests
  headers: {
    Accept: "application/json", // Default header to accept JSON responses
  },
});

export default axiosApi;