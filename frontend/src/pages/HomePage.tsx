import { Link } from "react-router-dom";
import { Container, Typography, Paper, Box } from "@mui/material";
import AltLogo from "../components/common/logo/AltLogo";
import SubmitButton from "../components/common/button/SubmitButton";

// TODO: Create a global theme for consistency
const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        animation: "fadeIn 1s ease-in-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "#9EADBD", //TODO: fix this color
            borderRadius: 3,
            textAlign: "center",
            color: "#fff", // White text for contrast
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            animation: "slideUp 0.8s ease-in-out",
            "@keyframes slideUp": {
              "0%": { transform: "translateY(20px)", opacity: 0 },
              "100%": { transform: "translateY(0)", opacity: 1 },
            },
          }}
        >
          <AltLogo width={100} marginBottom={20} />
          <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome to Delivery Manager
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, opacity: 0.85 }}>
            Manage your deliveries efficiently and effectively.
          </Typography>
          <SubmitButton component={Link} to="/login">
            Go to Login
          </SubmitButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
