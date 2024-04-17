// PREVIOUS CODE
// import axios from "axios";

// console.log(localStorage.getItem("accessToken"));

// export const makeRequest = axios.create({
//   baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
//   withCredentials: true,
//   headers: {
//     accessToken: localStorage.getItem("accessToken")
//   }
// });


import axios from "axios";

// Create a function to get the access token from localStorage
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Create a new instance of axios with a custom request interceptor
export const makeRequest = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/`,
  withCredentials: true,
});

// Add a request interceptor to update the access token before each request
makeRequest.interceptors.request.use(
  function(config) {
    // Get the latest access token before each request
    const accessToken = getAccessToken();
    
    // Set the accessToken header in the request config
    if (accessToken) {
      config.headers.accessToken = accessToken;
    }
    
    return config;
  },
  function(error) {
    console.error('makeRequest error:', error);
    // Do something with request error
    return Promise.reject(error);
  }
);

export default makeRequest;
