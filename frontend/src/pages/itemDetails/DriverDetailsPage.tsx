import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

const DriverDetailPage = () => {
  const { driverId } = useParams<{ driverId: string }>();
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await userService.getUser(Number(driverId));
        setDriver(response);
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };

    fetchDriver();
  }, [driverId]);

  if (!driver) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Driver Details</Typography>
        <Typography variant="body1">Name: {driver.name}</Typography>
        <Typography variant="body1">Email: {driver.email}</Typography>
        <Typography variant="body1">Phone: {driver.phone}</Typography>
        {/* Add more driver details as needed */}
      </Box>
    </Container>
  );
};

export default DriverDetailPage;
