import React from "react";

import useUspBarData from "../../hooks/useUspBarData";
import {
  createGlobalColors,
  getGlobalColors,
} from "../../api/global-color-settings";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Loader from "../../ui/loader";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useUspBarSubmit from "../../hooks/useUspBarSubmit";
import { useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import ColorPicker from "../../components/color-settings.jsx/color-picker";
import Stack from "@mui/material/Stack";

const GlobalColorSettingsListPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    backgroundColor: "#f8f9fa",
    itemBackgroundColor: "#ffffff",
    titleColor: "#333333",
    descriptionColor: "#666666",
    iconBackgroundColor: "#4CAF50",
    iconColor: "#ffffff",
    slideSpeed: 4,
    itemBorderRightColor: "#000000", // Default vertical border color (black)
  });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: GetGlobalColorsData, isLoading: GetGlobalColorsLoading } =
    useUspBarData(["get-global-colors"], getGlobalColors, setSnackbar);

  const handleSliderChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested designSettings fields - extract the key and set at root level for API
    if (name.startsWith("designSettings.")) {
      const designKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        [designKey]: value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const GlobalColorSettings = useUspBarSubmit(
    (data) => createGlobalColors(data),
    setSnackbar,
    {
      invalidateKeys: [["get-global-colors"]],
      onSuccess: () => {
        navigate("/app");
      },
    },
  );

  const isSubmitting = GlobalColorSettings.isPending;

  const handleSubmit = () => {
    if (formData) {
      GlobalColorSettings.mutate(formData);
    }
  };

  React.useEffect(() => {
    if (GetGlobalColorsData?.data) {
      const colors = GetGlobalColorsData.data;
      setFormData({
        backgroundColor: colors.backgroundColor || "#f8f9fa",
        itemBackgroundColor: colors.itemBackgroundColor || "#ffffff",
        titleColor: colors.titleColor || "#333333",
        descriptionColor: colors.descriptionColor || "#666666",
        iconBackgroundColor: colors.iconBackgroundColor || "#4CAF50",
        iconColor: colors.iconColor || "#ffffff",
        slideSpeed: colors.slideSpeed || 4,
        itemBorderRightColor: colors.itemBorderRightColor || "#000000",
      });
    }
  }, [GetGlobalColorsData]);

  if (GetGlobalColorsLoading) {
    return <Loader />;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#202223",
              fontSize: { xs: 18, sm: 20 },
            }}
          >
            Color Settings
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          border: "1px solid #e1e1e1",
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
        }}
      >
        {/* Color Selecting input */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          {/* Background Color */}
          <ColorPicker
            label="Bar Background Color"
            name="designSettings.backgroundColor"
            value={formData.backgroundColor || "#f8f9fa"}
            onChange={handleChange}
          />

          {/* Title Color */}
          <ColorPicker
            label="Title Color"
            name="designSettings.titleColor"
            value={formData.titleColor || "#333333"}
            onChange={handleChange}
          />

          {/* Description Color */}
          <ColorPicker
            label="Description Color"
            name="designSettings.descriptionColor"
            value={formData.descriptionColor || "#666666"}
            onChange={handleChange}
          />

          {/* Icon Background Color */}
          <ColorPicker
            label="Icon Background Color"
            name="designSettings.iconBackgroundColor"
            value={formData.iconBackgroundColor || "#4CAF50"}
            onChange={handleChange}
          />

          {/* Icon Color */}
          <ColorPicker
            label="Icon Color"
            name="designSettings.iconColor"
            value={formData.iconColor || "#ffffff"}
            onChange={handleChange}
          />

          {/* Item Border Right Color */}
          <ColorPicker
            label="Item Border Right Color"
            name="designSettings.itemBorderRightColor"
            value={formData.itemBorderRightColor || "#000000"}
            onChange={handleChange}
          />
          {/* Slider Speed */}
          <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
            <Typography
              variant="caption"
              sx={{
                color: "#6b7280",
                mb: 1,
                display: "block",
                fontSize: "14px",
              }}
            >
              Slider Speed (seconds): {formData.slideSpeed || 4}
            </Typography>
            <Slider
              value={formData.slideSpeed || 4}
              onChange={(_, value) => handleSliderChange("slideSpeed", value)}
              min={2}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{ maxWidth: { xs: "100%", sm: 300 } }}
            />
            <Typography
              variant="caption"
              sx={{ color: "#9ca3af", display: "block" }}
            >
              Speed of automatic slider animation (only applies when more than 4
              items)
            </Typography>
          </Box>
        </Box>

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

      {/* Save changes button */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: { xs: "stretch", sm: "flex-start" },
        }}
      >
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
            padding: "7px 18px",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="success" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default GlobalColorSettingsListPage;
