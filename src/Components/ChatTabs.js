import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";


import AreaCalculator from "./AreaCalculator";
import HectareToBiswa from "./HectareToBiswa";
import AngleCalculator from "./AngleCalculator";

const tabComponents = {
  'Area Calculator': <AreaCalculator/>,
  'Hectare To Biswa': <HectareToBiswa/>,
  'Land Area Calculator': <AngleCalculator/>
};

export default function Chat() {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabNames = Object.keys(tabComponents);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", p: 2 }}>
      {/* Vertical Tabs */}
      <Tabs
        orientation="vertical"
        value={selectedTab}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", minWidth: 120 }}
      >
        {tabNames.map((name, index) => (
          <Tab key={index} label={name} />
        ))}
      </Tabs>

      {/* Component Panel */}
      <Box sx={{ flex: 1, pl: 2 }}>
        {tabComponents[tabNames[selectedTab]]}
      </Box>
    </Box>
  );
}