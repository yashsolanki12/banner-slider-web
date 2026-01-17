// import axiosInstance from "./axios-instance";
import { useCurrentShopDomain } from "../utils/helper";
import axiosInstance from "./axios-instance";

const GetShopDomain = () => {
  const app = useCurrentShopDomain();
  return app;
};

export const getAllBanner = async () => {
  const shopDomain = GetShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found in URL parameters.");
    throw new Error("Shop domain is required.");
  }
  return axiosInstance
    .get("banner-slider", {
      headers: {
        "x-shopify-shop-domain": shopDomain,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error("API Error in get all banner:", error);
      throw error;
    });
};


export const getCurrentSession = async () => {
  const shopDomain = GetShopDomain();

  if (!shopDomain) {
    console.error("No shop domain found for session request");
    throw new Error("Shop domain is required for session");
  }

  return axiosInstance
    .get("/phone/session/current", {
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