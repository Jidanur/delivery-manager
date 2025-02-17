import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid2,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form data
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const data = await authService.login(formData);
      console.log("Login successful:", data);

      if (data.role === "manager") {
        navigate("/manager");
      } else if (data.role === "driver") {
        navigate("/driver");
      } else if (data.role === "client") {
        navigate("/client");
      } else {
        setError("Undefined role. Please contact support.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  };

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
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address or username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid2 container spacing={8}>
            <Grid2>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2>
            <Grid2>
              <Link href="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
