import { Container, Box, Typography, Paper } from "@mui/material";
import Signup from "../../components/authentication/Signup";
import Logo from "../../components/common/logo/Logo";

function SignupPage() {
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
            Delivery Management Signup
          </Typography>
          <Signup />
        </Box>
      </Paper>
    </Container>
  );
}

export default SignupPage;
