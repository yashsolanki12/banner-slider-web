import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Color picker component using native HTML input
const ColorPicker = ({ label, value, onChange, name }) => {
  return (
    <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          flexWrap: "wrap",
        }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.value } })
          }
          style={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            border: "1px solid #e1e1e1",
            borderRadius: 4,
            cursor: "pointer",
            padding: 2,
            minWidth: "36px",
          }}
        />
        <TextField
          size="small"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="#ffffff"
          sx={{
            flex: 1,
            minWidth: { xs: "calc(100% - 48px)", sm: "auto" },
            maxWidth: { xs: "100%", sm: 200 },
          }}
        />
      </Box>
    </Box>
  );
};

export default ColorPicker;
