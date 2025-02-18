import { Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<any>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await userService.getUser(Number(clientId));
        setClient(response);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };

    fetchClient();
  }, [clientId]);

  if (!client) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">Client Details</Typography>
        <Typography variant="body1">Name: {client.name}</Typography>
        <Typography variant="body1">Email: {client.email}</Typography>
        <Typography variant="body1">Phone: {client.phone}</Typography>
        {/* Add more client details as needed */}
      </Box>
    </Container>
  );
};

export default ClientDetailPage;
