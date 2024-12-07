import Env from "./env";

// Define API base URL
export const API_ENDPOINT_URL = Env.API_URL + "/api";

// Define API endpoint paths
export const LOGIN_URL = "/auth/login";
export const REGISTER_URL = "/auth/register";
export const CHECK_CREDENTIALS_URL = "/auth/checkCredentials";