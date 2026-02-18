import { getAllBanner } from "../api/banner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCurrentShopDomain } from "../utils/helper";
import { Tabs, Tab, Box, Typography } from "@mui/material";

export default function Banner() {
  const shopDomain = useCurrentShopDomain();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const {
    error: getAllBannerError,
    data: getAllBannerData,
    isLoading: getAllBannerLoading,
  } = useQuery({
    queryKey: ["banner", shopDomain],
    queryFn: () => getAllBanner(shopDomain),
    enabled: !!shopDomain,
  });

  console.log("Data:", getAllBannerData);

  if (getAllBannerLoading) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  if (getAllBannerError) {
    return <Box sx={{ p: 3 }}>Error loading banners: {getAllBannerError.message}</Box>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="banner tabs">
          <Tab label="All Banners" />
          <Tab label="Active Banners" />
          <Tab label="Create Banner" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6">All Banners</Typography>
            <pre>{JSON.stringify(getAllBannerData, null, 2)}</pre>
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6">Active Banners</Typography>
            <Typography>Displaying only active banners here.</Typography>
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6">Create New Banner</Typography>
            <Typography>Form to create a new banner will go here.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
