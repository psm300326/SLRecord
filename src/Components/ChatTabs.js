import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";

import AreaCalculator from "./AreaCalculator";
import HectareToBiswa from "./HectareToBiswa";
import AngleCalculator from "./AngleCalculator";

const tabComponents = {
  "Land Area Calculator": <AngleCalculator />,
  "Area Calculator": <AreaCalculator />,
  "Hectare To Biswa": <HectareToBiswa />
  
};

export default function Chat() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabNames = Object.keys(tabComponents);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // true on small screens

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: "100vh",
        p: 2,
      }}
    >
      {/* Responsive Tabs */}
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderRight: isSmallScreen ? 0 : 1,
          borderBottom: isSmallScreen ? 1 : 0,
          borderColor: "divider",
          minWidth: isSmallScreen ? "auto" : 150,
        }}
      >
        {tabNames.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
      </Tabs>

      {/* Component Panel */}
      <Box sx={{ flex: 1, p: 2 }}>
        {tabComponents[tabNames[selectedTab]]}
      </Box>
    </Box>
  );
}