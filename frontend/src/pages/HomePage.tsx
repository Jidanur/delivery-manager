import { Link } from "react-router-dom";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url(/path/to/your/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Typography component="h1" variant="h3" gutterBottom>
            Welcome to Delivery Manager
          </Typography>
          <Typography variant="h5" gutterBottom>
            Manage your deliveries efficiently and effectively.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our platform helps managers, drivers, and clients to streamline the
            delivery process, ensuring timely and accurate deliveries.
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
