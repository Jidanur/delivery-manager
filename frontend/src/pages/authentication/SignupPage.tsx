import { Container, Box, Typography } from "@mui/material";

import Signup from "../../components/authentication/Signup";

function SignupPage() {
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
          Delivery Management Signup
        </Typography>
        <Signup />
      </Box>
    </Container>
  );
}

export default SignupPage;
