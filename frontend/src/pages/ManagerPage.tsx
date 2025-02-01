import { useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";

import Sidebar from "../components/common/Sidebar";
import TableSection from "../components/common/Table/TableSection";

const ManagerPage = () => {
  const [selectedSection, setSelectedSection] = useState("Drivers");

  // Handles section switching when a menu item is clicked
  const handleNavigation = (section: string) => {
    setSelectedSection(section);
  };

  const sections = ["Drivers", "Clients", "Orders"];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: 240,
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
          <Sidebar
            sections={sections}
            selectedSection={selectedSection}
            onNavigate={handleNavigation}
            logoutPath="/logout"
          />
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" gutterBottom>
            {selectedSection === "Drivers" && "Manage Drivers"}
            {selectedSection === "Clients" && "Manage Clients"}
            {selectedSection === "Orders" && "Manage Orders"}
          </Typography>

          <Paper sx={{ padding: 3 }}>
            {/* Dynamic Content Placeholder */}
            {selectedSection === "Drivers" && (
              <TableSection
                title="Drivers"
                content="Placeholder content for managing drivers."
              />
            )}
            {selectedSection === "Clients" && (
              <TableSection
                title="Clients"
                content="Placeholder content for managing clients."
              />
            )}
            {selectedSection === "Orders" && (
              <TableSection
                title="Orders"
                content="Placeholder content for managing Orders."
              />
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ManagerPage;
