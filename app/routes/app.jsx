import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // eslint-disable-next-line no-undef
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData();

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 10,
          refetchOnWindowFocus: false,
          enabled: typeof window !== "undefined",
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider embedded apiKey={apiKey}>
        <s-app-nav>
          <s-link href="/app" rel="home">Home</s-link>
          <s-link href="/app/additional">Additional page</s-link>
          <s-link href="/app/banner">Banner</s-link>
        </s-app-nav>
        <Outlet />
      </AppProvider>
    </QueryClientProvider>
  );
}

// Shopify needs React Router to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
