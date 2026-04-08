import React from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import UspBarForm from "../components/usp-bar/usp-bar-form";

export default function EditUspBar() {
  const { id } = useParams();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <UspBarForm id={id} heading="Edit Usp Bar" />
    </Box>
  );
}
