import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PhoneDisabled from "@mui/icons-material/PhoneDisabled";

function NoUspBarFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="30vh"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 400,
          textAlign: "center",
          boxShadow: 3,
          transition: "box-shadow 0.3s ease-in-out",
          ":hover": {
            boxShadow: 6,
          },
        }}
      >
        <PhoneDisabled sx={{ fontSize: 50, color: "text.secondary", mb: 2 }} />{" "}
        <Typography
          variant="h5"
          color="text.secondary"
          fontWeight={600}
          sx={{
            mb: 2,
            color: "#757575",
          }}
        >
          No USP bar found.
        </Typography>
      </Paper>
    </Box>
  );
}

export default NoUspBarFound;
