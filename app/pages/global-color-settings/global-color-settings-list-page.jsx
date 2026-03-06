import React from "react";

import useUspBarData from "../../hooks/useUspBarData";
import { getGlobalColors } from "../../api/global-color-settings";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from "../../ui/loader";

const GlobalColorSettingsListPage = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { data: GetGlobalColorsData, isLoading: GetGlobalColorsLoading } =
    useUspBarData(["get-global-colors"], getGlobalColors, setSnackbar);

  console.log("data:", GetGlobalColorsData);
  console.log("sna", snackbar);
  if (GetGlobalColorsLoading) {
    return <Loader />;
  }
  return (
    <div>
      {" "}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalColorSettingsListPage;
