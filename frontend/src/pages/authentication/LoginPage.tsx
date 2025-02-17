import { Container, Box, Typography, Paper } from "@mui/material";
import Login from "../../components/authentication/Login";
import Logo from "../../components/common/logo/Logo";

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo width={100} height={100} marginBottom={20} />
          <Typography component="h1" variant="h5" gutterBottom>
            Delivery Management Login
          </Typography>
          <Login />
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
