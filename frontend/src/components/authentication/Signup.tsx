import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { UserData, UserInfo } from "../../types/userInterfaces";
import SubmitButton from "../common/button/SubmitButton";

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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
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
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "#3A4856", mb: 2 }}
        >
          Create an Account
        </Typography>
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
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            autoFocus
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
            }}
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
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
            }}
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
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
            }}
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
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="info.address"
            label="Address"
            id="address"
            value={formData.info.address || ""}
            onChange={handleChange}
            sx={{
              backgroundColor: "#F5F7FA",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "#3A4856" },
              "& .MuiInputLabel-root": { color: "#3A4856" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9EADBD" },
            }}
          />

          <FormControl fullWidth margin="normal" required error={!!error}>
            <InputLabel sx={{ color: "#3A4856" }}>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                backgroundColor: "#F5F7FA",
                borderRadius: 1,
                "& .MuiSelect-select": { color: "#3A4856" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9EADBD",
                },
              }}
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

          <SubmitButton type="submit">Sign Up</SubmitButton>
          <Link href="/login" variant="body2" sx={{ color: "#3A4856" }}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
