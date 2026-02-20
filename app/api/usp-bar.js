// import axiosInstance from "./axios-instance";
import { useCurrentShopDomain } from "../utils/helper";
import axiosInstance from "./axiosInstance";

export const getShopDomain = () => {
  const app = useCurrentShopDomain();
  return app;
};

export const getAllUspBar = async () => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("usp-slider", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in get all usp bar:", errorMessage);
      throw new Error(errorMessage);
    });
};

export const getCurrentSession = async () => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found for session request");
    throw new Error("Shop domain is required for session");
  }

  return axiosInstance
    .get("usp-slider/session/current", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
      // withCredentials: true, // only if you need cookies
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error in getCurrentSession:", error);
      throw error;
    });
};
