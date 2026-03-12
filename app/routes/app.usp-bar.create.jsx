import Box from "@mui/material/Box";
import UspBarForm from "../components/usp-bar/usp-bar-form";

export default function NewUspBar() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <UspBarForm heading="Create USP Bar" />
    </Box>
  );
}
