import { boundary } from "@shopify/shopify-app-react-router/server";
import UspBarList from "./app.usp-bar._index";

export default function Index() {
  return <UspBarList />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
