import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";

import { useLocation } from "react-router";
import SafeLink from "../../helper/safe-link";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={Number(value) !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {Number(value) === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const UspBarForm = ({ formData, setFormData, tabIndex }) => {
  const { pathname } = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Tabs
        value={Number(tabIndex)}
        variant="fullWidth"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            minWidth: 0,
            fontWeight: 500,
            color: "#6b7280",
            textDecoration: "none",
          },
          "& .Mui-selected": {
            color: "#202223 !important",
            backgroundColor: "#e1e1e1",
            borderRadius: "6px",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab
          label="Content"
          value={0}
          component={SafeLink}
          to={`${pathname}?tab=0`}
          {...a11yProps(0)}
        />
        <Tab
          label="Design"
          value={1}
          component={SafeLink}
          to={`${pathname}?tab=1`}
          {...a11yProps(1)}
        />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <Stack spacing={4}>
          <Box
            sx={{
              p: 3,
              border: "1px solid #e1e1e1",
              borderRadius: "8px",
              backgroundColor: "white",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Content
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
                >
                  Title
                </Typography>
                <TextField
                  fullWidth
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  size="small"
                  placeholder="Enter title"
                />
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
                >
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  size="small"
                  placeholder="Enter description"
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Box
          sx={{
            p: 3,
            border: "1px solid #e1e1e1",
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Design settings
          </Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#6b7280", mb: 0.5, display: "block" }}
            >
              Background Color
            </Typography>
            <TextField
              fullWidth
              name="backgroundColor"
              value={formData.backgroundColor || "#ffffff"}
              onChange={handleChange}
              size="small"
              placeholder="#ffffff"
            />
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default UspBarForm;
