import React from "react";

const GlobalColorSettingsList = React.lazy(
  () =>
    import("../pages/global-color-settings/global-color-settings-list-page"),
);
const GlobalColorSettings = () => {
  return (
    <React.Suspense fallback="">
      GlobalColorSettings
      <GlobalColorSettingsList />
      {/* Use to show the toast with desired position */}
    </React.Suspense>
  );
};

export default GlobalColorSettings;
