import Chip from "@mui/material/Chip";

const StatusChip = ({ status }) => {
  const isPublished = status === "Published";

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: isPublished ? "#dbf9ea" : "#f1f1f1",
        color: isPublished ? "#007f5f" : "#616161",
        fontWeight: "bold",
        borderRadius: "4px",
        "& .MuiChip-label": {
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      }}
    />
  );
};

export default StatusChip;
