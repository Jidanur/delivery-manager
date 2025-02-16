import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { packageService } from "../services/packageService";

const CreatePackagePage = () => {
  const [packageData, setPackageData] = useState({
    // Add necessary fields here
    clientName: "",
    deliveryAddress: "",
    deliveryZone: "",
    deliveryStatus: "Pending",
    driverName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newOrder = await packageService.createPackage(packageData);
      console.log("Order created:", newOrder);
      navigate("/manager"); // Redirect to the manager page after creating the order
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Create Package
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Client Name"
            name="clientName"
            value={packageData.clientName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Delivery Address"
            name="deliveryAddress"
            value={packageData.deliveryAddress}
            onChange={handleChange}
            required
          />
          <TextField
            label="Delivery Zone"
            name="deliveryZone"
            value={packageData.deliveryZone}
            onChange={handleChange}
          />
          <TextField
            label="Driver Name"
            name="driverName"
            value={packageData.driverName}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Order
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePackagePage;
