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
  getCurrentSession,
} from "../../api/usp-bar";

const UspBarList = (props) => {
  const { appEmbedEnabled, session } = props;

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Current Session
  const {
    data: UspBarCurrentSessionData,
    isLoading: UspBarCurrentSessionLoading,
  } = useUspBarData(
    ["usp-bar-current-session"],
    getCurrentSession,
    setSnackbar,
  );

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
    <>
      {/* Fallback dialog for enable theme */}
      {!appEmbedEnabled && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Horizontal centering
            alignItems: "center", // Vertical centering
            width: "100%", // Takes full width
          }}
        >
          {!appEmbedEnabled && (
            <Box
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                bgcolor: "error.lighter",
                border: "1px solid",
                borderColor: "error.light",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                maxWidth: 550,
                width: "100%",
                boxShadow: 1,
                backgroundColor: "#ebebeb",
              }}
            >
              <Typography
                variant="body2"
                color="error.dark"
                fontWeight={600}
                textAlign="center"
                fontSize={18}
              >
                ⚠️ USP Bar Widget is Currently Inactive
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{
                  color: "black",
                  letterSpacing: "0.30px",
                  textJustify: "inter-character",
                }}
              >
                To display your USP Bar, please complete the configuration below
                by defining your custom titles, descriptions, and brand styling.
                Once configured, you must enable the App Embed within your
                Shopify Theme Editor to activate the bar and integrate it into
                your live storefront. This ensures your unique selling
                propositions are professionally showcased with your personalized
                design and are fully functional across your store.
              </Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                fullWidth
                onClick={() => {
                  const currentShop =
                    session?.shop ||
                    UspBarCurrentSessionData?.session?.shop ||
                    new URLSearchParams(window.location.search).get("shop") ||
                    window.location.hostname;
                  const url = `https://${currentShop}/admin/themes/current/editor?context=apps`;
                  window.open(url, "_blank");
                }}
                sx={{ textTransform: "none", mt: 1 }}
              >
                Enable in Theme Editor
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* USP Bar List */}
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
    </>
  );
};

export default UspBarList;
