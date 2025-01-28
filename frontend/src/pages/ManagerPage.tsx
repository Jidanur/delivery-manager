import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ManagerPage = () => {
  const [selectedSection, setSelectedSection] = useState("Drivers");

  // Handles section switching when a menu item is clicked
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
        <Box>
          {/* Sidebar Header */}
          <Box
            sx={{
              padding: 2,
              backgroundColor: "primary.main",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Manager Dashboard</Typography>
          </Box>

          {/* Sidebar Navigation */}
          <List>
            <ListItemButton
              selected={selectedSection === "Drivers"}
              onClick={() => handleNavigation("Drivers")}
            >
              <ListItemText primary="Drivers" />
            </ListItemButton>
            <ListItemButton
              selected={selectedSection === "Clients"}
              onClick={() => handleNavigation("Clients")}
            >
              <ListItemText primary="Clients" />
            </ListItemButton>
            <ListItemButton
              selected={selectedSection === "Orders"}
              onClick={() => handleNavigation("Orders")}
            >
              <ListItemText primary="Orders" />
            </ListItemButton>
          </List>
        </Box>

        {/* Logout Button */}
        <Box sx={{ padding: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/logout"
          >
            Logout
          </Button>
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
              <Box>
                <Typography variant="h6">Drivers</Typography>
                <Typography variant="body1" color="text.secondary">
                  Placeholder content for managing drivers.
                </Typography>
              </Box>
            )}
            {selectedSection === "Clients" && (
              <Box>
                <Typography variant="h6">Clients</Typography>
                <Typography variant="body1" color="text.secondary">
                  Placeholder content for managing clients.
                </Typography>
              </Box>
            )}
            {selectedSection === "Orders" && (
              <Box>
                <Typography variant="h6">Orders</Typography>
                <Typography variant="body1" color="text.secondary">
                  Placeholder content for managing orders.
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ManagerPage;
