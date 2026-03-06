import Box from "@mui/material/Box";
import { authenticate } from "../shopify.server";
import UspBarForm from "../components/usp-bar/usp-bar-form";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function NewUspBar() {
  return (
    <Box sx={{ p: 4 }}>
      <UspBarForm heading="Create USP Bar" />
    </Box>
  );
}
