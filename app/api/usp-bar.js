// import axiosInstance from "./axios-instance";
import { useCurrentShopDomain } from "../utils/helper";
import axiosInstance from "./axiosInstance";

// Current Shop Domain
export const getShopDomain = () => {
  const app = useCurrentShopDomain();
  return app;
};

// List API
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

// Get by ID API
export const getUspBarById = async (id) => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get(`usp-slider/${id}`, {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in get usp bar by id:", errorMessage);
      throw new Error(errorMessage);
    });
};

// Delete API
export const deleteUspBar = async (id) => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found un URL parameters.");
    throw new Error("Shop domain is required");
  }
  return axiosInstance
    .delete(`usp-slider/${id}`, {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error while delete usp bar:", errorMessage);
      throw new Error(errorMessage);
    });
};

// Create API
export const createUspBar = async (data) => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .post("usp-slider/add", data, {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error in create usp bar:", error);
      throw error;
    });
};

// Update API
export const updateUspBar = async ({ id, data }) => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .put(`usp-slider/${id}`, data, {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error in update usp bar:", error);
      throw error;
    });
};

// Current shop session
export const getCurrentSession = async () => {
  const shopDomain = getShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found for session request");
    throw new Error("Shop domain is required for session");
  }

  return axiosInstance
    .get("usp-slider/session/current/shop", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
      // withCredentials: true, // only if you need cookies
    })
    .then((res) => res.data)

    .catch((error) => {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("API Error in getCurrentSession:", errorMessage);
      throw new Error(errorMessage);
    });
};
