import { Box, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const ClientPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Profile");
  const sections = ["Profile", "Orders"];

  const handleNavigation = (section: string) => {
    setSelectedSection(section);
  };

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
        <Sidebar
          sections={sections}
          selectedSection={selectedSection}
          onNavigate={handleNavigation}
          logoutPath="/logout"
          heading="Client Dashboard"
        />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fafafa" }}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" gutterBottom>
            {selectedSection === "Profile" && "Manage Profile"}
            {selectedSection === "Orders" && "Manage Orders"}
          </Typography>
          <Paper sx={{ padding: 3 }}>
            {selectedSection === "Profile" && (
              <Typography variant="body1" align="center">
                Here you can manage your profile.
              </Typography>
            )}
            {selectedSection === "Orders" && (
              <Typography variant="body1" align="center">
                Here you can view and manage your orders.
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ClientPage;
