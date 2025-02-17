import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import StyledButton from "../common/button/StyledButton";

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
    <Box sx={{ width: "100%", mt: 2 }}>
      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address or Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          sx={{
            backgroundColor: "#F5F7FA", // Light gray for readability
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#3A4856" }, // Dark blue-gray text
            "& .MuiInputLabel-root": { color: "#3A4856" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" }, // Subtle contrast
          }}
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
          sx={{
            backgroundColor: "#F5F7FA", // Light gray
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#3A4856" },
            "& .MuiInputLabel-root": { color: "#3A4856" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
          }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ color: "#3A4856" }} />}
          label="Remember me"
          sx={{ color: "#3A4856" }}
        />
        <StyledButton type="submit">Sign In</StyledButton>
        <Grid2 container justifyContent="space-between">
          <Grid2>
            <Link href="#" variant="body2" sx={{ color: "#3A4856" }}>
              Forgot password?
            </Link>
          </Grid2>
          <Grid2>
            <Link href="/signup" variant="body2" sx={{ color: "#3A4856" }}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default Login;
