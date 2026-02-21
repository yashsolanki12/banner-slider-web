import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { authenticate } from "../shopify.server";
import { useParams } from "react-router";
import UspBarForm from "../components/usp-bar/usp-bar-form";

export const loader = async ({ request, params }) => {
  await authenticate.admin(request);
  return null;
};

export default function EditUspBar() {
  const { id } = useParams();

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <UspBarForm id={id} heading="Edit USP Bar" />
        </Grid>
      </Grid>
    </Box>
  );
}
