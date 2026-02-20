import React from "react";

const UspBarListPage = React.lazy(
  () => import("../pages/usp-bar-list/usp-bar-list-page"),
);

export default function UspBarPage() {
  return (
    <React.Suspense fallback="">
      {/* Usp bar list */}
      <UspBarListPage />
    </React.Suspense>
  );
}
