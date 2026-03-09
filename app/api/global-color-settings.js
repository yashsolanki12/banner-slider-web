import axiosInstance from "./axiosInstance";
import { getShopDomain } from "./usp-bar";

export const createGlobalColors = async (data) => {
  const shopDomain = getShopDomain();
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .post("usp-slider/global-colors", data, {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in create global colors:", errorMessage);
      throw new Error(errorMessage);
    });
};

export const getGlobalColors = async () => {
  const shopDomain = getShopDomain();
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("usp-slider/global-colors", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in get global colors:", errorMessage);
      throw new Error(errorMessage);
    });
};

export const deleteGlobalColors = async () => {
  const shopDomain = getShopDomain();
  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .delete("usp-slider/global-colors", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in delete global colors:", errorMessage);
      throw new Error(errorMessage);
    });
};
