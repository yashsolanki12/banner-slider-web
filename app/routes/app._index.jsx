import React from "react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import UspBarPage from "./app.usp-bar._index";
// const UspBarPage = React.lazy(() => import("./app.usp-bar._index"));

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    // <React.Suspense fallback="">
      <UspBarPage />
    // </React.Suspense>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
