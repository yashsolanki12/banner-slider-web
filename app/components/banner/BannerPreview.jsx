import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const BannerPreview = ({ formData }) => {
  const {
    title = "Free shipping for orders over $50!",
    description = "",
    backgroundColor = "#ffffff",
  } = formData || {};

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e1e1e1",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#f9fafb",
        p: 3,
        height: "100%",
        minHeight: "400px",
      }}
    >
      {/* Placeholder content for preview */}
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            height: "40px",
            backgroundColor: "#f3f4f6",
            borderRadius: "10px",
            width: "30%",
            mb: 1,
            opacity: 0.5,
          }}
        />
        <Box sx={{ mt: 4 }}>
          {[95, 95, 90].map((width, i) => (
            <Box
              key={i}
              sx={{
                height: "12px",
                backgroundColor: "#f3f4f6",
                borderRadius: "4px",
                width: `${width}%`,
                mb: 1,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Shipping Bar Preview Section */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          border: "1px solid #e1e1e1",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="caption"
          sx={{ display: "block", mb: 2, color: "#6b7280" }}
        >
          {description || "Build trust and boost AOV. Both apps work better together."}
        </Typography>

        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              borderColor: "#e1e1e1",
              color: "#202223",
            }}
          >
            Install now
          </Button>
        </Box>

        <Box
          sx={{
            p: 2,
            border: "1px solid #e1e1e1",
            borderRadius: "8px",
            backgroundColor: backgroundColor,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 1,
              color: backgroundColor === "#ffffff" ? "#202223" : "inherit",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "4px",
              backgroundColor: "#f3f4f6",
              borderRadius: "2px",
              position: "relative",
              mb: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "20%",
                height: "100%",
                backgroundColor: "#202223",
                borderRadius: "2px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  mr: 1,
                }}
              />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    color: backgroundColor === "#ffffff" ? "#202223" : "inherit",
                  }}
                >
                  Daily Specials - Moisturizing cream
                </Typography>
                <Typography variant="caption" sx={{ color: "#d32f2f" }}>
                  $24.99
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                borderColor: "#e1e1e1",
                color: "#202223",
                backgroundColor: "white",
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BannerPreview;
