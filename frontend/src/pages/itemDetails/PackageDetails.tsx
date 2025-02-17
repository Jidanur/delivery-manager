import { Box, Typography, Container } from "@mui/material";
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
        setOrder(response);
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
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">package Details</Typography>
        <Typography variant="body1">Order ID: {order.package_id}</Typography>
        <Typography variant="body1">
          Delivery Address: {order.delivery_address}
        </Typography>
        <Typography variant="body1">
          Delivery Zone: {order.delivery_zone}
        </Typography>
        <Typography variant="body1">
          Delivery Status: {order.delivery_status}
        </Typography>
        {/* Add more order details as needed */}
      </Box>
    </Container>
  );
};

export default PackageDetailPage;
