import React from "react";
import Snackbar from "@mui/material/Snackbar";

import { getAllUspBar } from "../api/usp-bar";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Loader from "../components/skeleton/loader";

import UspBarTablePage from "../pages/usp-bar-table-page";

const UspBarListPage = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Usp Bar List
  const {
    error: UspBarListError,
    data: UspBarListData,
    isLoading: UspBarListLoading,
  } = useQuery({
    queryKey: ["usp-bar"],
    queryFn: () => getAllUspBar(),
    onError: (error) => {
      console.error("Usp bar list error:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to load Usp bar list",
        severity: "error",
      });
    },
  });

  React.useEffect(() => {
    if (UspBarListData) {
      setSnackbar({
        open: true,
        message: UspBarListData.message,
        severity: "success",
      });
      console.log("Usp bar list data:", UspBarListData);
    }
  }, [UspBarListData]);

  if (UspBarListLoading) {
    return <Loader />;
  }
  return (
    <>
      <UspBarTablePage data={UspBarListData} />
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
    </>
  );
};

export default UspBarListPage;
