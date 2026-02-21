import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { authenticate } from "../shopify.server";
import UspBarForm from "../components/usp-bar/usp-bar-form";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function NewUspBar() {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <UspBarForm heading="Create USP Bar" />
        </Grid>
      </Grid>
    </Box>
  );
}
