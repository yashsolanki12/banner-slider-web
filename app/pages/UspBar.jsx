import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StatusChip from "../components/ui/StatusChip";
import UspBarForm from "../components/usp-bar/UspBarForm";

export default function BannerPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const tabIndex = Number(searchParams.get("tab")) || 0;

  const [formData, setFormData] = useState({
    name: "Announcement name",
    type: "Simple announcement",
    title: "Enjoy a 20% discount on all our products!",
    description: "Hurray!",
    subheading: "",
    couponCode: "",
    backgroundColor: "#ffffff",
    position: "top",
    pages: "all",
  });

  useEffect(() => {
    console.log("Tab changed:", tabIndex);
  }, [tabIndex]);

  const handleSave = () => {
    console.log("Saving:", formData);
    // Add save logic here
    navigate("/app/usp-bar");
  };

  return (
    <Box>
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
            onClick={() => navigate("/app/usp-bar")}
            size="small"
            sx={{ color: "#202223" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
            {formData.name || "Announcement name"}
          </Typography>
          <StatusChip status="Not published" />
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

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <UspBarForm
            formData={formData}
            setFormData={setFormData}
            tabIndex={tabIndex}
          />
        </Grid>
        {/* <Grid item size={{ xs: 12, md: 8 }}>
          <UspBarPreview formData={formData} />
        </Grid> */}
      </Grid>
    </Box>
  );
}
