import { Box, Typography, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { packageService } from "../../services/packageService";

const PackageDetailPage = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await packageService.getPackage(Number(packageId));
        console.log("response", response);
        setOrder(response.package);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [packageId]);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Package Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Order ID:</strong> {order.package_id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Delivery Address:</strong> {order.delivery_address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Delivery Zone:</strong> {order.delivery_zone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Delivery Status:</strong> {order.delivery_status}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PackageDetailPage;
