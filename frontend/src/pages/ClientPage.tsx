import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ClientPage = () => {
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
          Client Dashboard
        </Typography>
        <Typography variant="h5" gutterBottom>
          Welcome to the Client Dashboard.
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

export default ClientPage;
