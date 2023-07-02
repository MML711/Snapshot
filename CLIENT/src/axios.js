import axios from "axios";

export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
  withCredentials: true,
  headers: {
    accessToken: localStorage.getItem("accessToken")
  }
});
