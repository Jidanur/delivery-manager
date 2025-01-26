import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const DriverPage = () => {
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
          Driver Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom>
          Welcome to the Driver Dashboard.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/logout"
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default DriverPage;
