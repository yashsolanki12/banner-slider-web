import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./utils/emotion-cache";
import createEmotionServer from "@emotion/server/create-instance";
import { addDocumentResponseHeaders } from "./shopify.server";

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
) {
  addDocumentResponseHeaders(request, responseHeaders);

  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <CacheProvider value={cache}>
      <ServerRouter context={reactRouterContext} url={request.url} />
    </CacheProvider>
  );

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);

  // Inject styles into the head
  const finalHtml = html.replace(
    /<\/head>/,
    `${styles}</head>`
  );

  responseHeaders.set("Content-Type", "text/html; charset=utf-8");

  return new Response(`<!DOCTYPE html>${finalHtml}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
