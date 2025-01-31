import { Link } from "react-router-dom";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import AltLogo from "../components/common/logo/AltLogo";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Container component="main" maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <AltLogo width={150} marginBottom={20} />
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to Delivery Manager
          </Typography>
          <Typography variant="h5" gutterBottom>
            Manage your deliveries efficiently and effectively.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{ mt: 3 }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
