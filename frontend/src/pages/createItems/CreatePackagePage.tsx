import {
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { packageService } from "../../services/packageService";
import { userService } from "../../services/userService";
import {
  PackageData,
  ServiceType,
  DeliveryStatus,
  DeliveryZone,
} from "../../types/packageInterfaces";
import SubmitButton from "../../components/common/button/SubmitButton";

const CreatePackagePage = () => {
  const [packageData, setPackageData] = useState<PackageData>({
    delivery_address: "",
    delivery_zone: DeliveryZone.ZONE_1,
    delivery_status: DeliveryStatus.PENDING,
    order_instructions: "",
    order_comment: "",
    service_type: ServiceType.STANDARD,
  });
  const [clients, setClients] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/login";
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await userService.getAllUsers();
        setClients(allUsers.filter((user: any) => user.role === "client"));
        setDrivers(allUsers.filter((user: any) => user.role === "driver"));
        if (userRole === "client") {
          const client = allUsers.find(
            (user: any) => user.user_id === parseInt(userId)
          );
          setPackageData((prevData) => ({
            ...prevData,
            client_id: client.client.client_id,
          }));
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRole, userId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newOrder = await packageService.createPackage(packageData);
      console.log("Order created:", newOrder);
      navigate(from); // Navigate back to the previous page
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
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {userRole === "manager" && (
                <>
                  <TextField
                    select
                    label="Client ID"
                    name="client_id"
                    value={packageData.client_id || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {clients.map((client) => (
                      <MenuItem
                        key={client.client.client_id}
                        value={client.client.client_id}
                      >
                        {client.username}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Driver ID"
                    name="driver_id"
                    value={packageData.driver_id || ""}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {drivers.map((driver) => (
                      <MenuItem
                        key={driver.driver.driver_id}
                        value={driver.driver.driver_id}
                      >
                        {driver.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}
            </>
          )}
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
          <SubmitButton type="submit">Create Order</SubmitButton>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePackagePage;
