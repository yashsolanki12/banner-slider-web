import { boundary } from "@shopify/shopify-app-react-router/server";
import BannerList from "./app.banner._index";

export default function Index() {
  return <BannerList />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
