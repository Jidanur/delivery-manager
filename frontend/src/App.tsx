import { Container, CssBaseline, Box, Typography } from "@mui/material";
import Login from "./components/Login";

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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

export default App;
