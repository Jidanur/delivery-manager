import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { packageService } from "../services/packageService";
import {
  PackageData,
  ServiceType,
  DeliveryStatus,
  DeliveryZone,
} from "../types/packageInterfaces";

const CreatePackagePage = () => {
  const [packageData, setPackageData] = useState<PackageData>({
    delivery_address: "",
    delivery_zone: DeliveryZone.ZONE_1,
    delivery_status: DeliveryStatus.PENDING,
    order_instructions: "",
    order_comment: "",
    service_type: ServiceType.STANDARD,
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
      navigate("/manager");
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
            select
            label="Delivery Zone"
            name="delivery_zone"
            value={packageData.delivery_zone || ""}
            onChange={handleChange}
            required
          >
            {Object.values(DeliveryZone).map((zone) => (
              <MenuItem key={zone} value={zone}>
                {zone}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Delivery Status"
            name="delivery_status"
            value={packageData.delivery_status || ""}
            onChange={handleChange}
            required
          >
            {Object.values(DeliveryStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Client ID"
            name="client_id"
            type="number"
            value={packageData.client_id || ""}
            onChange={handleChange}
          />
          <TextField
            label="Driver ID"
            name="driver_id"
            type="number"
            value={packageData.driver_id || ""}
            onChange={handleChange}
          />
          <TextField
            label="Pickup Time"
            name="pickup_time"
            type="datetime-local"
            value={packageData.pickup_time || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Delivery Time"
            name="delivery_time"
            type="datetime-local"
            value={packageData.delivery_time || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Service Type"
            name="service_type"
            value={packageData.service_type || ""}
            onChange={handleChange}
            required
          >
            {Object.values(ServiceType).map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Order Instructions"
            name="order_instructions"
            value={packageData.order_instructions || ""}
            onChange={handleChange}
          />
          <TextField
            label="Order Comment"
            name="order_comment"
            value={packageData.order_comment || ""}
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
