import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

const HomePage = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
      </Box>
    </Container>
  );
};

export default HomePage;
