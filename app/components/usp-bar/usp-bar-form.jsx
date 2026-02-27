import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import Slider from "@mui/material/Slider";

import { useLocation, useNavigate } from "react-router";
import SafeLink from "../../helper/safe-link";
import {
  getUspBarById,
  createUspBar,
  updateUspBar,
  getCurrentSession,
} from "../../api/usp-bar";
import { validateUspBarForm } from "../../validation/usp-bar-validation";
import useUspBarData from "../../hooks/useUspBarData";
import useUspBarSubmit from "../../hooks/useUspBarSubmit";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={Number(value) !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {Number(value) === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

// Color picker component
const ColorPicker = ({ label, value, onChange, name }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: "#6b7280",
          mb: 0.5,
          display: "block",
          fontSize: "14px",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <input
          type="color"
          value={value}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.value } })
          }
          style={{
            width: 40,
            height: 40,
            border: "1px solid #e1e1e1",
            borderRadius: 4,
            cursor: "pointer",
            padding: 2,
          }}
        />
        <TextField
          size="small"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="#ffffff"
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

const UspBarForm = ({ id, heading }) => {
  const isEditMode = Boolean(id);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(isEditMode);
  const [tabIndex, setTabIndex] = React.useState(0);

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    icon: null,
    designSettings: {
      backgroundColor: "#f8f9fa",
      itemBackgroundColor: "#ffffff",
      titleColor: "#333333",
      descriptionColor: "#666666",
      iconBackgroundColor: "#4CAF50",
      iconColor: "#ffffff",
      slideSpeed: 4,
      itemBorderRightColor: "#000000", // Default vertical border color (black)
    },
  });

  // Snackbar state
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

  // Correct usage with ID
  const { data: UspBarDetailData, isLoading: UspBarDetailLoading } =
    useUspBarData(
      ["usp-bar-detail", id],
      () => getUspBarById(id),
      setSnackbar,
      { enabled: Boolean(id) && isEditMode, staleTime: 0 },
    );

  // Create mutation using useUspBarSubmit hook
  const createMutation = useUspBarSubmit(
    (data) =>
      createUspBar({
        ...data,
        shopify_session_id: UspBarCurrentSessionData?.data?._id || null,
      }),
    setSnackbar,
    {
      invalidateKeys: [["usp-bar"]],
      onSuccess: () => {
        navigate("/app");
      },
    },
  );

  // Update mutation using useUspBarSubmit hook
  const updateMutation = useUspBarSubmit(
    (data) => updateUspBar({ id, data }),
    setSnackbar,
    {
      invalidateKeys: [["usp-bar"]],
      onSuccess: () => {
        navigate("/app");
      },
    },
  );

  // Validation errors state
  const [errors, setErrors] = React.useState({});

  // Set the data from detail API with custom hook
  React.useEffect(() => {
    if (id && isEditMode) {
      if (UspBarDetailData?.success == true && UspBarDetailData?.data) {
        setFormData({
          title: UspBarDetailData?.data?.title || "",
          description: UspBarDetailData?.data?.description || "",
          icon: UspBarDetailData?.data?.icon || null,
          designSettings: {
            backgroundColor:
              UspBarDetailData?.data?.designSettings?.backgroundColor ||
              "#f8f9fa",
            itemBackgroundColor:
              UspBarDetailData?.data?.designSettings?.itemBackgroundColor ||
              "#ffffff",
            titleColor:
              UspBarDetailData?.data?.designSettings?.titleColor || "#333333",
            descriptionColor:
              UspBarDetailData?.data?.designSettings?.descriptionColor ||
              "#666666",
            iconBackgroundColor:
              UspBarDetailData?.data?.designSettings?.iconBackgroundColor ||
              "#4CAF50",
            iconColor:
              UspBarDetailData?.data?.designSettings?.iconColor || "#ffffff",
            slideSpeed: UspBarDetailData?.data?.designSettings?.slideSpeed || 4,
            itemBorderRightColor:
              UspBarDetailData?.data?.designSettings?.itemBorderRightColor ||
              "#000000",
          },
        });
      }
    }
  }, [UspBarDetailData, id, isEditMode]);

  // Client-side validation using Zod
  const validateForm = () => {
    const result = validateUspBarForm(formData);
    if (result.errors) {
      setErrors(result.errors);
    } else {
      setErrors({});
    }
    return result.isValid;
  };

  // Clear error when field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested designSettings fields
    if (name.startsWith("designSettings.")) {
      const designKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        designSettings: {
          ...prev.designSettings,
          [designKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle slider change
  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      designSettings: {
        ...prev.designSettings,
        [name]: value,
      },
    }));
  };

  const handleTabChange = (_event, newValue) => {
    setTabIndex(newValue);
  };

  // Handle icon upload
  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file format (only JPG, PNG, SVG)
      const validFormats = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!validFormats.includes(file.type)) {
        setSnackbar({
          open: true,
          message: "Only JPG, PNG, and SVG formats are allowed.",
          severity: "error",
        });
        event.target.value = "";
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: "Image size must be less than 2MB.",
          severity: "error",
        });
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setFormData((prev) => ({
          ...prev,
          icon: base64Image,
        }));
        event.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove icon
  const handleRemoveIcon = () => {
    setFormData((prev) => ({
      ...prev,
      icon: null,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleNavigateBack = () => {
    navigate("/app", { replace: true });
  };

  // Handle API error response and set field errors
  const handleApiError = (error) => {
    const errorResponse = error.response?.data;
    const errorMessage = errorResponse?.message;
    let message = "Failed to save phone";

    if (Array.isArray(errorResponse) && errorResponse.length > 0) {
      message = errorResponse.join(" | ");
    } else if (errorResponse?.message) {
      message = errorResponse.message;
    } else if (error.message) {
      message = error.message;
    }
    if (Array.isArray(errorMessage)) {
      // API returns array of validation errors
      const newErrors = {};
      errorMessage.forEach((msg) => {
        if (typeof msg === "string") {
          if (msg.toLowerCase().includes("title")) {
            newErrors.title = msg;
          } else if (msg.toLowerCase().includes("description")) {
            newErrors.description = msg;
          }
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      }
    } else {
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    }
  };

  const isSubmitting = isEditMode
    ? updateMutation.isPending
    : createMutation.isPending;

  const handleSubmit = () => {
    // Validate form before submitting
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the validation errors",
        severity: "error",
      });
      return;
    }

    // Use the appropriate mutation based on mode
    if (isEditMode) {
      const payload = {
        id: id,
        title: formData.title,
        description: formData.description,
        designSettings: formData.designSettings,
        icon: formData.icon,
      };
      updateMutation.mutate(payload, {
        onError: handleApiError,
      });
    } else {
      const payload = {
        title: formData.title,
        description: formData.description,
        shopify_session_id: UspBarCurrentSessionData?.data?._id || null,
        designSettings: formData.designSettings,
        icon: formData.icon,
      };
      createMutation.mutate(payload, {
        onError: handleApiError,
      });
    }
  };

  if (UspBarDetailLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={handleNavigateBack}
            size="small"
            sx={{ color: "#202223", cursor: "pointer" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
            {heading || (isEditMode ? "Edit USP Bar" : "Create USP Bar")}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            minWidth: 0,
            fontWeight: 500,
            color: "#6b7280",
            textDecoration: "none",
          },
          "& .Mui-selected": {
            color: "#202223 !important",
            backgroundColor: "#e1e1e1",
            borderRadius: "6px",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab
          label="Content"
          value={0}
          component={SafeLink}
          to={`${pathname}?tab=0`}
          {...a11yProps(0)}
        />
        <Tab
          label="Design"
          value={1}
          component={SafeLink}
          to={`${pathname}?tab=1`}
          {...a11yProps(1)}
        />
      </Tabs>

      {/* Content Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Stack spacing={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid #e1e1e1",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <Stack spacing={2}>
              {/* Title */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6b7280",
                    mb: 0.5,
                    display: "block",
                    fontSize: "16px",
                  }}
                >
                  Title *
                </Typography>
                <TextField
                  fullWidth
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  size="small"
                  placeholder="Enter title"
                  error={Boolean(errors?.title)}
                  helperText={errors?.title || ""}
                  FormHelperTextProps={{
                    sx: { color: "#d32f2f", marginLeft: 0 },
                  }}
                />
              </Box>

              {/* Description */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6b7280",
                    mb: 0.5,
                    display: "block",
                    fontSize: "16px",
                  }}
                >
                  Description *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  size="medium"
                  placeholder="Enter description"
                  error={Boolean(errors?.description)}
                  helperText={errors?.description || ""}
                  FormHelperTextProps={{
                    sx: { color: "#d32f2f", marginLeft: 0 },
                  }}
                />
              </Box>

              {/* Icon Upload */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6b7280",
                    mb: 0.5,
                    display: "block",
                    fontSize: "16px",
                  }}
                >
                  Icon (Optional)
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Icon Preview */}
                  {formData.icon && (
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={formData.icon}
                        alt="Icon Preview"
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          border: "1px solid #e1e1e1",
                          borderRadius: "8px",
                          padding: "8px",
                          backgroundColor: "white",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={handleRemoveIcon}
                        sx={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          minWidth: 24,
                          boxShadow: 1,
                        }}
                      >
                        ✕
                      </IconButton>
                    </Box>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/svg+xml"
                    onChange={handleIconUpload}
                    style={{
                      display: "none",
                    }}
                    id="icon-upload"
                  />
                  <label htmlFor="icon-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        fontWeight: 500,
                      }}
                    >
                      {formData.icon ? "Change Icon" : "Upload Icon"}
                    </Button>
                  </label>

                  {!formData.icon && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6b7280",
                      }}
                    >
                      Supported formats: JPG, PNG, SVG (max 2MB)
                    </Typography>
                  )}
                </Box>
              </Box>
            </Stack>
          </Box>
          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
          >
            <Button
              variant="contained"
              onClick={handleNavigateBack}
              sx={{
                backgroundColor: "#c9c9c9",
                color: "black",
                textTransform: "none",
                borderRadius: "6px",
                fontWeight: 600,
                padding: "8px 24px",
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#202223",
                color: "white",
                textTransform: "none",
                borderRadius: "6px",
                fontWeight: 600,
                padding: "8px 24px",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="success" />
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Stack>
      </TabPanel>

      {/* Design Tab */}
      <TabPanel value={tabIndex} index={1}>
        <Stack spacing={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid #e1e1e1",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Color Settings
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              {/* Background Color */}
              {/* <ColorPicker
                label="Bar Background Color"
                name="designSettings.backgroundColor"
                value={formData.designSettings?.backgroundColor || "#f8f9fa"}
                onChange={handleChange}
              /> */}

              {/* Item Background Color */}
              {/* <ColorPicker
                label="Item Background Color"
                name="designSettings.itemBackgroundColor"
                value={
                  formData.designSettings?.itemBackgroundColor || "#ffffff"
                }
                onChange={handleChange}
              /> */}

              {/* Title Color */}
              <ColorPicker
                label="Title Color"
                name="designSettings.titleColor"
                value={formData.designSettings?.titleColor || "#333333"}
                onChange={handleChange}
              />

              {/* Description Color */}
              <ColorPicker
                label="Description Color"
                name="designSettings.descriptionColor"
                value={formData.designSettings?.descriptionColor || "#666666"}
                onChange={handleChange}
              />

              {/* Icon Background Color */}
              <ColorPicker
                label="Icon Background Color"
                name="designSettings.iconBackgroundColor"
                value={
                  formData.designSettings?.iconBackgroundColor || "#4CAF50"
                }
                onChange={handleChange}
              />

              {/* Icon Color */}
              <ColorPicker
                label="Icon Color"
                name="designSettings.iconColor"
                value={formData.designSettings?.iconColor || "#ffffff"}
                onChange={handleChange}
              />

              {/* Item Border Right Color */}
              <ColorPicker
                label="Item Border Right Color"
                name="designSettings.itemBorderRightColor"
                value={
                  formData.designSettings?.itemBorderRightColor || "#000000"
                }
                onChange={handleChange}
              />
            </Box>

            {/* Slider Speed */}
            {/* <Box sx={{ mt: 3 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  mb: 1,
                  display: "block",
                  fontSize: "14px",
                }}
              >
                Slider Speed (seconds):{" "}
                {formData.designSettings?.slideSpeed || 4}
              </Typography>
              <Slider
                value={formData.designSettings?.slideSpeed || 4}
                onChange={(_, value) => handleSliderChange("slideSpeed", value)}
                min={2}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ maxWidth: 300 }}
              />
              <Typography
                variant="caption"
                sx={{ color: "#9ca3af", display: "block" }}
              >
                Speed of automatic slider animation (only applies when more than
                3 items)
              </Typography>
            </Box> */}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
          >
            <Button
              variant="contained"
              onClick={handleNavigateBack}
              sx={{
                backgroundColor: "#c9c9c9",
                color: "black",
                textTransform: "none",
                borderRadius: "6px",
                fontWeight: 600,
                padding: "8px 24px",
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#202223",
                color: "white",
                textTransform: "none",
                borderRadius: "6px",
                fontWeight: 600,
                padding: "8px 24px",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="success" />
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create"
              )}
            </Button>
          </Box>
        </Stack>
      </TabPanel>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="standard"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default UspBarForm;
