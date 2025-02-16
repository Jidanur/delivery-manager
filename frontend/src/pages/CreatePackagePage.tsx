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
import { PackageData } from "../types/packageInterfaces";

const CreatePackagePage = () => {
  const [packageData, setPackageData] = useState<PackageData>({
    delivery_address: "",
    delivery_zone: "",
    service_type: "",
    client_id: undefined,
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
            label="Delivery Address"
            name="delivery_address"
            value={packageData.delivery_address}
            onChange={handleChange}
            required
          />
          <TextField
            label="Delivery Zone"
            name="delivery_zone"
            value={packageData.delivery_zone}
            onChange={handleChange}
          />
          <TextField
            label="Service Type"
            name="service_type"
            value={packageData.service_type}
            onChange={handleChange}
          />
          <TextField
            label="Client ID"
            name="client_id"
            type="number"
            value={packageData.client_id || ""}
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
