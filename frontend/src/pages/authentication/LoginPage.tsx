import { Container, Box, Typography, Paper } from "@mui/material";
import Login from "../../components/authentication/Login";
import Logo from "../../components/common/logo/Logo";

function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A2D2FF",
        animation: "fadeIn 1s ease-in-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            textAlign: "center",
            color: "#3A4856",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            animation: "slideUp 0.8s ease-in-out",
            "@keyframes slideUp": {
              "0%": { transform: "translateY(20px)", opacity: 0 },
              "100%": { transform: "translateY(0)", opacity: 1 },
            },
          }}
        >
          <Logo width={100} height={100} marginBottom={20} />
          <Typography component="h1" variant="h5" gutterBottom>
            Delivery Management Login
          </Typography>
          <Login />
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
