import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const ClientPage = () => {
  const navigate = useNavigate();
  const sections = ["Profile", "Orders"];

  const handleNavigation = (section: string) => {
    // Handle navigation logic here
    console.log(`Navigating to ${section}`);
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
          selectedSection="Profile"
          onNavigate={handleNavigation}
          logoutPath="/logout"
          heading="Client"
        />
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fafafa" }}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" gutterBottom>
            Client Dashboard
          </Typography>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="body1" align="center">
              Welcome to the Client Dashboard. Here you can manage your profile
              and view your orders.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ClientPage;
