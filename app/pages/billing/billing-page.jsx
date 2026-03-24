import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Check from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ConfirmDialog from "../../ui/confirmation-dialog";
import LinearProgress from "@mui/material/LinearProgress";
import { syncStoreMetrics } from "../../api/usp-bar";

const BillingPage = ({ shop, submit, actionData }) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [metrics, setMetrics] = React.useState(null);
  const [cancelPlanDialogOpen, setCancelPlanDialogOpen] = React.useState(false);
  // Show snackbar when actionData changes
  React.useEffect(() => {
    if (actionData) {
      setSnackbar({
        open: true,
        message: actionData.message || "Operation completed",
        severity: actionData.success ? "success" : "error",
      });
    }
  }, [actionData]);

  React.useEffect(() => {
    const planName = shop?.subscription?.name || "Free";
    syncStoreMetrics(planName)
      .then((res) => {
        if (res?.success && res?.data) {
          setMetrics(res.data);
        }
      })
      .catch((error) => {
        console.error('Sync error:',error)
      });
  }, [shop.subscription]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const currentStore = shop.shop.split(".").at(0);

  const handleViewPlan = () => {
    window.open(
      `https://admin.shopify.com/store/${currentStore}/charges/usp-bar-test/pricing_plans`,
      "_top",
    );
  };

  const handleChangePlan = () => {
    window.open(
      `https://admin.shopify.com/store/${currentStore}/charges/usp-bar-test/pricing_plans`,
      "_top",
    );
  };
  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 2, gap: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#202223",
              fontSize: { xs: 18, sm: 20 },
            }}
          >
            Plans
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        {/* View Limit Progress */}
        {metrics && shop?.subscription !== undefined && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, color: "#202223" }}>
              You're currently on <strong>{metrics.planName}</strong> (
              {metrics.viewsCount} /{" "}
              {metrics.limit === -1 ? "Unlimited" : metrics.limit} monthly
              views). One visitor can have multiple views per session.
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                metrics.limit === -1
                  ? 0
                  : Math.min((metrics.viewsCount / metrics.limit) * 100, 100)
              }
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#202223",
                },
              }}
            />
          </Box>
        )}
      </Box>

      {shop.subscription ? (
        <>
          <Card
            sx={{
              borderRadius: "10px",
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 300 },
              maxWidth: { xs: "100%", sm: 500 },
              mx: { xs: 0 },
              alignSelf: { xs: "stretch", sm: "flex-start" },
            }}
          >
            <CardContent>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "11px", sm: "14px" },
                  backgroundColor: "#2b835b",
                  p: { xs: 0.75, sm: 1 },
                  color: "white",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                  wordBreak: "break-word",
                  lineHeight: 1.4,
                }}
                fontWeight={600}
                mb={{ xs: 2, sm: 3.5 }}
              >
                <Check
                  sx={{
                    color: "white",
                    fontSize: { xs: 14, sm: 20 },
                    flexShrink: 0,
                  }}
                />
                <Box component="span" sx={{ display: "inline-block" }}>
                  {`You are subscribed to the "${shop.subscription.name}" plan.`}
                </Box>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000000",
                    color: "white",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    padding: { xs: "10px 18px", sm: "7px 18px" },
                    textDecoration: "none",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "#303030",
                    },
                  }}
                  onClick={handleChangePlan}
                >
                  Change Plan
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "black",
                    textTransform: "none",
                    borderRadius: "6px",
                    fontWeight: 600,
                    padding: { xs: "10px 18px", sm: "7px 18px" },
                    textDecoration: "none",
                    width: { xs: "100%", sm: "auto" },
                    border: "1px solid #ddd",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  onClick={() => setCancelPlanDialogOpen(true)}
                >
                  Cancel Plan
                </Button>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#202223",
            color: "white",
            textTransform: "none",
            borderRadius: "6px",
            fontWeight: 600,
            padding: { xs: "12px 18px", sm: "7px 18px" },
            textDecoration: "none",
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              backgroundColor: "#303030",
            },
          }}
          onClick={handleViewPlan}
        >
          View Plans
        </Button>
      )}

      {/* Delete Cancel Plan Confirmation */}
      <ConfirmDialog
        open={cancelPlanDialogOpen}
        title="Confirm Plan Cancellation?"
        message={`This action cannot be undone. This will cancel your "${shop.subscription?.name}" plan.`}
        onClose={() => setCancelPlanDialogOpen(false)}
        onConfirm={() =>
          submit({}, { method: "POST" }, setCancelPlanDialogOpen(false))
        }
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BillingPage;
