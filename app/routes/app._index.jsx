import React from "react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import Usp , { loader as uspLoader } from "./app.usp";

export const loader = uspLoader;

export default function Index() {
  return <Usp />;
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
