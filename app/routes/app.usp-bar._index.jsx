import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SafeLink from "../helper/safe-link";
import UspBarListPage from "../pages/usp-bar-list-page";

export default function UspBarPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
          Usp Bar List
        </Typography>
        <Button
          variant="contained"
          component={SafeLink}
          to="/app/usp-bar/new"
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
          New usp bar
        </Button>
      </Stack>

      <UspBarListPage />
    </Box>
  );
}
