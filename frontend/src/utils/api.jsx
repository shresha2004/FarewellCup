import axios from "axios";

const api = axios.create({


   baseURL: "http://localhost:6002/api",
  //baseURL: "https://farewell-cup.vercel.app/api",


  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Add a request interceptor (optional)
api.interceptors.request.use(
  (config) => {
   // console.log(`Request sent to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
