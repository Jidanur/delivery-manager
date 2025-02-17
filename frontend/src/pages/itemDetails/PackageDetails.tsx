import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { packageService } from "../../services/packageService";

const PackageDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await packageService.getPackage(Number(orderId));
        setOrder(response);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Order Details</Typography>
        <Typography variant="body1">Package ID: {order.package_id}</Typography>
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
