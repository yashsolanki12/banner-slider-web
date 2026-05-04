import React from "react";

const GlobalColorSettingsList = React.lazy(
  () =>
    import("../pages/global-color-settings/global-color-settings-list-page"),
);
const GlobalColorSettings = () => {
  return (
    <React.Suspense fallback="">
      <GlobalColorSettingsList />
    </React.Suspense>
  );
};

export default GlobalColorSettings;
