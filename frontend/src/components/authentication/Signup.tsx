import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService"; // Adjust the import path accordingly
import { UserData, UserInfo } from "../../types/userInterfaces"; // Assuming the types are in a 'types.ts' file

function Signup() {
  const [formData, setFormData] = useState<UserData>({
    username: "",
    password: "",
    role: "",
    info: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "role") {
        return { ...prevData, role: value as string };
      }
      
      if (name.startsWith("info.")) {
        const field = name.split(".")[1];
        return {
          ...prevData,
          info: { ...prevData.info, [field]: value },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.password ||
      !formData.role ||
      !formData.info.name ||
      !formData.info.email ||
      !formData.info.phone
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const userInfo: UserInfo = await userService.createUser(formData);
      console.log("Signup successful", userInfo);
      navigate("/login");  // Redirect to login after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
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
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="info.name"
            label="Full Name"
            id="name"
            value={formData.info.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="info.email"
            label="Email Address"
            id="email"
            autoComplete="email"
            value={formData.info.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="info.phone"
            label="Phone Number"
            id="phone"
            value={formData.info.phone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="info.address"
            label="Address"
            id="address"
            value={formData.info.address || ""}
            onChange={handleChange}
          />

          {/* Role Selection Dropdown */}
          <FormControl fullWidth margin="normal" required error={!!error}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
