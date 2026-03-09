import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Color picker component using native HTML input
const ColorPicker = ({ label, value, onChange, name }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          color: "#6b7280",
          mb: 0.5,
          display: "block",
          fontSize: "14px",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <input
          type="color"
          value={value}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.value } })
          }
          style={{
            width: 40,
            height: 40,
            border: "1px solid #e1e1e1",
            borderRadius: 4,
            cursor: "pointer",
            padding: 2,
          }}
        />
        <TextField
          size="small"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="#ffffff"
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default ColorPicker;
