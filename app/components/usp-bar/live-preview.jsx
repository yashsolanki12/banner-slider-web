import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const LivePreview = ({ formData }) => {
  // Get design settings - always show colors (default or custom)
  const getDesignSettings = () => {
    if (formData?.designSettings) {
      return {
        backgroundColor: formData.designSettings.backgroundColor || "#f8f9fa",
        itemBackgroundColor:
          formData.designSettings.itemBackgroundColor || "#ffffff",
        titleColor: formData.designSettings.titleColor || "#333333",
        descriptionColor: formData.designSettings.descriptionColor || "#666666",
        iconColor: formData.designSettings.iconColor || "#0e0e0e",
        itemBorderRightColor:
          formData.designSettings.itemBorderRightColor || "#000000",
      };
    }
    // Default design settings - matching form defaults
    return {
      backgroundColor: "#f8f9fa",
      itemBackgroundColor: "#ffffff",
      titleColor: "#333333",
      descriptionColor: "#666666",
      iconColor: "#cc6b6b",
      itemBorderRightColor: "#000000",
    };
  };

  const designSettings = getDesignSettings();

  // Get icon color for uploaded images
  const iconColor = designSettings.iconColor || "#0e0e0e";

  const hasContent = formData.title || formData.description || formData.icon;

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e1e1e1",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Preview Header */}
      <Box
        sx={{
          p: 1.3,
          backgroundColor: "#202223",
          borderBottom: "1px solid #e1e1e1",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "#4CAF50",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 1 },
                "50%": { opacity: 0.5 },
                "100%": { opacity: 1 },
              },
            }}
          />
          Live Preview
        </Typography>
      </Box>

      {/* Preview Container */}
      <Box
        sx={{
          p: { xs: 1, sm: 1 },
          minHeight: 150,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* USP Bar Preview */}
        <Box
          sx={{
            width: "100%",
            padding: "10px 20px",
            boxSizing: "border-box",
            backgroundColor: designSettings.backgroundColor,
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {hasContent ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* Single Item Preview */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                  backgroundColor: designSettings.itemBackgroundColor,
                  padding: "12px 16px",
                  borderRadius: "5px",
                  position: "relative",
                  maxWidth: "100%",
                  flex: "0 0 auto",
                }}
              >
                {/* Border Separator - actual element instead of pseudo */}
                <Box
                  sx={{
                    position: "absolute",
                    right: "-10px",
                    top: "25%",
                    height: "50%",
                    width: "3px",
                    backgroundColor: designSettings.itemBorderRightColor,
                    zIndex: 5,
                    borderRadius: "1px",
                  }}
                />
                {/* Icon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 45,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {!formData.icon ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={designSettings.iconColor || "#0e0e0e"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                      <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                      <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                      <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                      <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                      <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                    </svg>
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 45,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: iconColor,
                        maskImage: `url(${formData.icon})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskImage: `url(${formData.icon})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  )}
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    minWidth: 0,
                    flex: "0 1 auto",
                    maxWidth: "100%",
                  }}
                >
                  {/* Title */}
                  {formData.title && (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "18px",
                        color: designSettings.titleColor,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        // maxWidth: "200px",
                        lineHeight: 1.2,
                      }}
                    >
                      {formData.title}
                    </Typography>
                  )}
                  {/* Description */}
                  {formData.description && (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: designSettings.descriptionColor,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        // maxWidth: "200px",
                        mt: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      {formData.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            /* Empty State */
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
                px: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#9ca3af",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Start typing to see preview...
              </Typography>
            </Box>
          )}
        </Box>

        {/* Preview Info */}
        <Box>
          <Divider sx={{ mb: 1.5 }} />
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontSize: "11px",
              display: "block",
              textAlign: "center",
            }}
          >
            This is a live preview. The actual appearance may vary slightly
            based on your theme.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default LivePreview;
