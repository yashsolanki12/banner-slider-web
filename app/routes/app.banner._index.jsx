import { authenticate } from "../shopify.server";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import BannerTable from "../components/banner/BannerTable";
import SafeLink from "../components/ui/SafeLink";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const dummyBanners = [
  {
    id: 1,
    title: "Second Announcement name",
    description: "This is description for second announcement",
  },
  {
    id: 2,
    title: "First Announcement name",
    description: "This is description for first announcement",
  },
];

export default function BannerList() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#202223" }}>
          Banner List
        </Typography>
        <Button
          variant="contained"
          component={SafeLink}
          to="/app/banner/new"
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
          New banner
        </Button>
      </Stack>

      <Box>
        {/* Banner Table */}
        <BannerTable data={dummyBanners} />
      </Box>
    </Box>
  );
}
