import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SafeLink from "../helper/safe-link";
import UspBarForm from "../components/usp-bar/usp-bar-form";

import { useNavigate, useLocation } from "react-router";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function NewUspBar() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const tabIndex = Number(searchParams.get("tab")) || 0;

  const [formData, setFormData] = React.useState({
    name: "Usp bar name",
    type: "Simple announcement",
    title: "Enjoy a 20% discount on all our products!",
    description: "Hurray!",
    subheading: "",
    couponCode: "",
    backgroundColor: "#ffffff",
  });

  const handleSave = () => {
    console.log("Saving banner:", formData);
    // Add save logic here
    // navigate(`/app${search}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            component={SafeLink}
            to="/app"
            exclude={["tab"]}
            size="small"
            sx={{ color: "#202223", textDecoration: "none" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
            {formData.name || "Announcement name"}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#202223",
            color: "white",
            textTransform: "none",
            borderRadius: "6px",
            fontWeight: 600,
            padding: "8px 24px",
            "&:hover": {
              backgroundColor: "#303030",
            },
          }}
        >
          Publish
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <UspBarForm
              formData={formData}
              setFormData={setFormData}
              tabIndex={tabIndex}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
