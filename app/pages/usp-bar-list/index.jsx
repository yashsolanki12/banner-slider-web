import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import UspBarTablePage from "./usp-bar-table-page";
import SafeLink from "../../helper/safe-link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useUspBarData from "../../hooks/useUspBarData";
import useUspBarSubmit from "../../hooks/useUspBarSubmit";
import Loader from "../../ui/loader";
import {
  getAllUspBar,
  deleteUspBar,
  toggleUspBarEnabled,
} from "../../api/usp-bar";

const UspBarList = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Usp Bar List
  const { data: UspBarListData, isLoading: UspBarListLoading } = useUspBarData(
    ["usp-bar"],
    getAllUspBar,
    setSnackbar,
  );

  // Delete Mutation
  const deleteMutation = useUspBarSubmit(
    (id) => deleteUspBar(id),
    setSnackbar,
    { invalidateKeys: [["usp-bar"]] },
  );

  // Toggle Enabled Mutation
  const toggleMutation = useUspBarSubmit(
    (id) => toggleUspBarEnabled(id),
    setSnackbar,
    { invalidateKeys: [["usp-bar"]] },
  );

  if (UspBarListLoading) {
    return <Loader />;
  }
  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
          USP Bar List
        </Typography>
        <Button
          variant="contained"
          component={SafeLink}
          to="/app/usp-bar/create"
          sx={{
            backgroundColor: "#202223",
            color: "white",
            textTransform: "none",
            borderRadius: "6px",
            fontWeight: 600,
            padding: "8px 24px",
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#303030",
            },
          }}
        >
          Create
        </Button>
      </Stack>

      {/* Table which manage all list data */}
      <UspBarTablePage
        data={UspBarListData || []}
        deleteMutation={deleteMutation}
        toggleMutation={toggleMutation}
        // onEdit={(row) => console.log("Edit:", row)}
      />

      {/* Use to show the toast with desired position */}
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
    </Box>
  );
};

export default UspBarList;
