import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./utils/emotion-cache";

const cache = createEmotionCache();

startTransition(() => {
    hydrateRoot(
        document,
        <StrictMode>
            <CacheProvider value={cache}>
                <HydratedRouter />
            </CacheProvider>
        </StrictMode>
    );
});
