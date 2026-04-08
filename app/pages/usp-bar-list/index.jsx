import React from "react";

import ReusableTable from "../../components/reusable-table";
import SafeLink from "../../helper/safe-link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import useUspBarData from "../../hooks/useUspBarData";
import useUspBarSubmit from "../../hooks/useUspBarSubmit";
import Loader from "../../ui/loader";
import {
  getAllUspBar,
  deleteUspBar,
  toggleUspBarEnabled,
  getCurrentSession,
  syncStoreMetrics,
  duplicateUspBar,
  bulkDeleteUspBar,
  bulkToggleUspBar,
} from "../../api/usp-bar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ConfirmDialog from "../../ui/confirmation-dialog";
import { uspBarColumns, uspBarActions } from "./columns-config";
import Warning from "@mui/icons-material/Warning";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const UspBarList = (props) => {
  const { appEmbedEnabled, session } = props;

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  // Filter state
  const [filter, setFilter] = React.useState("all"); // "all", "active", "inactive"

  // Selected items state
  const [selectedIds, setSelectedIds] = React.useState([]);

  // Bulk action menu state
  const [bulkMenuAnchor, setBulkMenuAnchor] = React.useState(null);

  // Bulk delete confirmation dialog state
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = React.useState(false);

  // Handle filter change
  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
    setSelectedIds([]); // Clear selection when filter changes
  };

  // Get filtered data based on filter state
  const getFilteredData = () => {
    if (!UspBarListData?.data) return [];

    if (filter === "active") {
      return UspBarListData.data.filter((item) => item.enabled === true);
    } else if (filter === "inactive") {
      return UspBarListData.data.filter((item) => item.enabled === false);
    }
    return UspBarListData.data;
  };

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(getFilteredData().map((item) => item._id));
    } else {
      setSelectedIds([]);
    }
  };

  // Handle individual checkbox
  const handleSelectOne = (id) => {
    const currentIndex = selectedIds.indexOf(id);
    const newSelected = [...selectedIds];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedIds(newSelected);
  };

  // Close bulk menu
  const handleBulkMenuClose = () => {
    setBulkMenuAnchor(null);
  };

  const planName = props?.subscription ? props?.subscription.name || "Free" : "No Plan";
  const {
    data: UspBarViewSyncData,
    isLoading: UspBarViewSyncLoading,
    error: UspBarViewSynError,
  } = useUspBarData(
    ["usp-bar-view-sync"],
    () => syncStoreMetrics(planName),
    null,
  );

  // React.useEffect(() => {
  //   const planName = props?.subscription?.name || "Free";
  //   syncStoreMetrics(planName)
  //     .then((res) => {
  //       if (res?.success && res?.data) {
  //         setMetrics(res.data);
  //       }
  //     })
  //     .catch(console.error);
  // }, [props.subscription]);

  // Current Session
  const {
    data: UspBarCurrentSessionData,
    isLoading: UspBarCurrentSessionLoading,
  } = useUspBarData(["usp-bar-current-session"], getCurrentSession, null);

  // Usp Bar List - Show toast for list API messages
  const { data: UspBarListData, isLoading: UspBarListLoading } = useUspBarData(
    ["usp-bar"],
    getAllUspBar,
    null, // Show toast for list fetch
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

  // Duplicate Mutation
  const duplicateMutation = useUspBarSubmit(
    (id) => duplicateUspBar(id),
    setSnackbar,
    { invalidateKeys: [["usp-bar"]] },
  );

  // Bulk Delete Mutation
  const bulkDeleteMutation = useUspBarSubmit(
    (ids) => bulkDeleteUspBar(ids),
    setSnackbar,
    { invalidateKeys: [["usp-bar"]] },
  );

  // Bulk Toggle Mutation
  const bulkToggleMutation = useUspBarSubmit(
    ({ ids, enabled }) => bulkToggleUspBar(ids, enabled),
    setSnackbar,
    { invalidateKeys: [["usp-bar"]] },
  );

  const isLimitExceeded = String(UspBarViewSynError).includes("limit");

  // Handle bulk delete - show confirmation
  const handleBulkDeleteClick = () => {
    setBulkDeleteDialogOpen(true);
  };

  // Confirm bulk delete
  const handleConfirmBulkDelete = () => {
    if (selectedIds.length > 0) {
      bulkDeleteMutation.mutate(selectedIds, {
        onSuccess: () => {
          setSelectedIds([]);
          setBulkDeleteDialogOpen(false);
          handleBulkMenuClose();
        },
        onError: () => {
          setBulkDeleteDialogOpen(false);
        },
      });
    }
  };

  // Handle bulk enable
  const handleBulkEnable = () => {
    if (selectedIds.length > 0) {
      bulkToggleMutation.mutate(
        { ids: selectedIds, enabled: true },
        {
          onSuccess: () => {
            setSelectedIds([]);
            handleBulkMenuClose();
          },
        },
      );
    }
  };

  // Handle bulk disable
  const handleBulkDisable = () => {
    if (selectedIds.length > 0) {
      bulkToggleMutation.mutate(
        { ids: selectedIds, enabled: false },
        {
          onSuccess: () => {
            setSelectedIds([]);
            handleBulkMenuClose();
          },
        },
      );
    }
  };

  const navigateAppEmbed = () => {
    const currentShop =
      session?.shop ||
      UspBarCurrentSessionData?.session?.shop ||
      new URLSearchParams(window.location.search).get("shop") ||
      window.location.hostname;
    const url = `https://${currentShop}/admin/themes/current/editor?context=apps`;
    window.open(url, "_blank");
  };

  React.useEffect(() => {
    if (isLimitExceeded && props?.subscription !== undefined) {
      setSnackbar({
        open: true,
        message: String(UspBarViewSynError),
        severity: "error",
      });
    }
  }, [isLimitExceeded]);

  if (UspBarListLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* Fallback dialog for enable theme */}
      {!appEmbedEnabled && (
        <Box sx={{ p: 4 }}>
          <Card sx={{ borderRadius: "10px", boxShadow: 2 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2 } }}>
              {/* Header/Warning Bar */}
              <Box
                sx={{
                  backgroundColor: "#ffb800",
                  borderRadius: "5px",
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Warning sx={{ fontSize: { xs: 20, sm: 24 }, flexShrink: 0 }} />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: "#232220",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  Usp bar is not activated yet.
                </Typography>
              </Box>

              {/* Instruction Text */}
              <Typography
                variant="body2"
                sx={{
                  color: "#6d7175",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  mb: 2,
                }}
              >
                <span style={{ fontSize: "14px" }}>
                  Please activate the app by clicking{" "}
                </span>
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: "black", fontSize: "14px" }}
                >
                  'Activate'
                </Box>{" "}
                button.
              </Typography>

              {/* Action Button */}
              <Button
                variant="contained"
                fullWidth={{ xs: true, sm: false }} // Auto-stretches on mobile
                sx={{
                  backgroundColor: "#202223",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  p: "5px 10px",
                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "#303030",
                  },
                }}
                onClick={navigateAppEmbed}
              >
                Activate
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Fallback for view limit reached */}
      {/* {isLimitExceeded && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: appEmbedEnabled ? 3 : 0, // Add margin if theme warning is not present
          }}
        >
          <Box
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: "#fff3cd",
              border: "1px solid #ffeeba",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              maxWidth: 550,
              width: "100%",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="body2"
              color="#856404"
              fontWeight={600}
              textAlign="center"
              fontSize={18}
            >
              ⚠️ Monthly View Limit Reached
            </Typography>
            <Typography
              variant="body2"
              color="#856404"
              textAlign="center"
              sx={{
                letterSpacing: "0.30px",
                fontSize: 13,
              }}
            >
              Your USP Bar has reached its monthly view limit. To keep
              displaying your announcements to customers, please upgrade your
              plan. Unlimited views are available on our premium plans.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="small"
              fullWidth
              sx={{
                textTransform: "none",
                mt: 1,
                backgroundColor: "#856404",
                "&:hover": { backgroundColor: "#6d5203" },
              }}
              onClick={() => navigate("/app/plans")}
            >
              Explore Plans
            </Button>
          </Box>
        </Box>
      )} */}

      {/* USP Bar List */}
      <Box sx={{ p: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          {(!appEmbedEnabled || appEmbedEnabled) && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#202223",
                fontSize: 20,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Usp Bar List
            </Typography>
          )}
          {(UspBarListData?.data?.length || 0) < 10 && (
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
                padding: "7px 18px",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "#303030",
                },
              }}
            >
              New bar
            </Button>
          )}
        </Stack>
        {/* View Limit Progress */}
        {/* && props?.subscription !== undefined */}
        {true === UspBarViewSyncData?.success &&
          props.subscription !== undefined && (
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
                You're currently on{" "}
                <strong>{UspBarViewSyncData.data.planName}</strong> (
                {UspBarViewSyncData.data.viewsCount} /{" "}
                {UspBarViewSyncData.data.limit === -1
                  ? "Unlimited"
                  : UspBarViewSyncData.data.limit}{" "}
                monthly views). One visitor can have multiple views per session.
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  UspBarViewSyncData.data.limit === -1
                    ? 0
                    : Math.min(
                        (UspBarViewSyncData.data.viewsCount /
                          UspBarViewSyncData.data.limit) *
                          100,
                        100,
                      )
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
        {/* Filter Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            aria-label="USP Bar filter tabs"
          >
            <Tab
              label={`All (${UspBarListData?.data?.length || 0})`}
              value="all"
              disableTypography
              sx={{ textTransform: "none" }}
            />
            <Tab
              label={`Active (${UspBarListData?.data?.filter((item) => item.enabled === true).length || 0})`}
              value="active"
              disableTypography
              sx={{ textTransform: "none" }}
            />
            <Tab
              label={`Inactive (${UspBarListData?.data?.filter((item) => item.enabled === false).length || 0})`}
              value="inactive"
              disableTypography
              sx={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: 1,
              mb: 2,
              p: 1.5,
              bgcolor: "#f5f5f5",
              borderRadius: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              {selectedIds.length} item(s) selected
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={() => setSelectedIds([])}
                sx={{ textTransform: "none" }}
              >
                Clear Selection
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleBulkEnable}
                sx={{ textTransform: "none" }}
              >
                Enable Selected
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleBulkDisable}
                sx={{ textTransform: "none" }}
              >
                Disable Selected
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={handleBulkDeleteClick}
                sx={{ textTransform: "none" }}
              >
                Delete Selected
              </Button>
            </Box>
          </Box>
        )}
        {/* Table which manage all list data */}
        <ReusableTable
          data={getFilteredData()}
          columns={uspBarColumns}
          actions={uspBarActions}
          mutations={{
            deleteMutation,
            toggleMutation,
            duplicateMutation,
          }}
          showStatus={true}
          snackbarState={snackbar}
          setSnackbar={setSnackbar}
          emptyMessage={`No USP Bar found${filter !== "all" ? ` with ${filter} status` : ""}.`}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          showCheckbox={true}
        />
        {/* Bulk Delete Confirmation Dialog */}
        <ConfirmDialog
          open={bulkDeleteDialogOpen}
          title="Confirm Bulk Delete?"
          message={`This action cannot be undone. This will permanently delete ${selectedIds.length} selected entries.`}
          onClose={() => setBulkDeleteDialogOpen(false)}
          onConfirm={handleConfirmBulkDelete}
          loading={bulkDeleteMutation?.isPending}
        />
      </Box>
    </>
  );
};

export default UspBarList;
