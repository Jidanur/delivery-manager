import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import GeneralTable from "../components/common/Table/GeneralTable";
import { packageService } from "../services/packageService";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Profile");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sections = ["Profile", "Orders"];

  useEffect(() => {
    const fetchData = async () => {
      if (selectedSection === "Orders") {
        setLoading(true);
        try {
          const response = await packageService.getMyPackages();
          console.log("API response:", response); // Log the entire response object
          if (Array.isArray(response.data)) {
            const formattedPackages = response.data.map((pkg: any) => ({
              package_id: pkg.package_id,
              delivery_address: pkg.delivery_address,
              delivery_zone: pkg.delivery_zone || "N/A",
              delivery_status: pkg.delivery_status || "Pending",
              pickup_time: pkg.pickup_time || "N/A",
              delivery_time: pkg.delivery_time || "N/A",
            }));
            setData(formattedPackages);
          } else {
            console.error("Expected an array but got:", response);
          }
        } catch (error) {
          console.error("Error fetching packages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedSection]);

  const handleNavigation = (section: string) => {
    setSelectedSection(section);
  };

  const handleCreateOrder = () => {
    navigate("/create-package", { state: { from: "/client" } });
  };

  const handleDeleteOrder = async (packageId: number) => {
    try {
      await packageService.deletePackage(packageId);
      setData((prevData) =>
        prevData.filter((pkg) => pkg.package_id !== packageId)
      );
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const columns = [
    { id: "package_id", label: "Package ID" },
    { id: "delivery_address", label: "Delivery Address" },
    { id: "delivery_zone", label: "Delivery Zone" },
    { id: "delivery_status", label: "Status" },
    { id: "pickup_time", label: "Pickup Time" },
    { id: "delivery_time", label: "Delivery Time" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: 240,
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 1,
        }}
      >
        <Sidebar
          sections={sections}
          selectedSection={selectedSection}
          onNavigate={handleNavigation}
          logoutPath="/logout"
          heading="Client Dashboard"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrder}
            sx={{ margin: 2 }}
          >
            Create Order
          </Button>
        </Sidebar>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fafafa" }}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" gutterBottom>
            {selectedSection === "Profile" && "Manage Profile"}
            {selectedSection === "Orders" && "Manage Orders"}
          </Typography>
          <Paper sx={{ padding: 3 }}>
            {selectedSection === "Profile" && (
              <Typography variant="body1" align="center">
                Here you can manage your profile.
              </Typography>
            )}
            {selectedSection === "Orders" && (
              <>
                {loading ? (
                  <CircularProgress />
                ) : data.length > 0 ? (
                  <GeneralTable
                    columns={columns}
                    data={data}
                    actions={(row) => (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteOrder(row.package_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  />
                ) : (
                  <Typography variant="body1" align="center">
                    No orders available.
                  </Typography>
                )}
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ClientPage;
