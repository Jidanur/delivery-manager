import { Container, Box, Typography } from "@mui/material";
import Login from "../../components/authentication/Login";

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Delivery Management Login
        </Typography>
        <Login />
      </Box>
    </Container>
  );
}

export default LoginPage;
