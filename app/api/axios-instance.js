import axios from "axios";

const getBaseUrl = () => {
  const backEndDomain = "https://banner-slider-backend.onrender.com";
  return `${backEndDomain}/api/`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("❌ Request Error", error);
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("❌ API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);
export default axiosInstance;
