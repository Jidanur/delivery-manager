import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
  IconButton,
  Fab,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import GeneralTable from "../components/common/table/GeneralTable";
import { packageService } from "../services/packageService";
import { userService } from "../services/userService";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ManagerPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("Drivers");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (selectedSection === "Orders") {
          const packages = await packageService.getAllPackages();
          const formattedPackages = packages?.data
            .map((pkg: any) => ({
              package_id: pkg.package_id,
              order_from: pkg.client ? pkg.client.name : "N/A",
              delivery_address: pkg.delivery_address,
              delivery_zone: pkg.delivery_zone || "N/A",
              delivery_status: pkg.delivery_status || "Pending",
              driver: pkg.driver ? pkg.driver.name : "Unassigned",
            }))
            .sort((a: any, b: any) => a.package_id - b.package_id); // Sorting by package_id
          setData(formattedPackages);
        } else {
          const users = await userService.getAllUsers();
          const filteredUsers = users.filter((user: any) =>
            selectedSection === "Drivers"
              ? user.role === "driver"
              : user.role === "client"
          );

          setData(
            filteredUsers.map((user: any) => ({
              user_id:
                user.role === "driver"
                  ? user.driver?.driver_id
                  : user.client?.client_id,
              username: user.username,
              email: user.driver?.email || user.client?.email || "N/A",
              phone: user.driver?.phone || user.client?.phone || "N/A",
            }))
          );
        }
      } catch (error) {
        console.error(`Error fetching ${selectedSection}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection]);

  const handleNavigation = (section: string) => {
    setSelectedSection(section);
  };

  const handleCreateOrder = () => {
    navigate("/create-package", { state: { from: "/manager" } });
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

  const sections = ["Drivers", "Clients", "Orders"];

  // Define table columns dynamically based on the selected section
  const columns =
    selectedSection === "Orders"
      ? [
          { id: "package_id", label: "Package ID" },
          { id: "order_from", label: "Order From" },
          { id: "delivery_address", label: "Delivery Address" },
          { id: "delivery_zone", label: "Delivery Zone" },
          { id: "delivery_status", label: "Status" },
          { id: "driver", label: "Assigned Driver" },
        ]
      : [
          {
            id: "user_id",
            label: selectedSection === "Drivers" ? "Driver ID" : "Client ID",
          },
          { id: "username", label: "Username" },
          { id: "email", label: "Email" },
          { id: "phone", label: "Phone" },
        ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        sections={sections}
        selectedSection={selectedSection}
        onNavigate={handleNavigation}
        logoutPath="/logout"
        heading="Manager Dashboard"
      />
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fafafa" }}>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" gutterBottom>
            {selectedSection === "Drivers" && "Manage Drivers"}
            {selectedSection === "Clients" && "Manage Clients"}
            {selectedSection === "Orders" && "Manage Orders"}
          </Typography>
          <Typography component="h2" variant="h5" gutterBottom>
            {selectedSection}
          </Typography>
          <Paper sx={{ padding: 3, position: "relative" }}>
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
                No data available.
              </Typography>
            )}
            {selectedSection === "Orders" && (
              <Tooltip title="Create Order" arrow>
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={handleCreateOrder}
                  sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ManagerPage;
