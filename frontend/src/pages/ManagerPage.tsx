import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import SectionLayout from "../components/common/section/SectionLayout";
import TableWithActions from "../components/common/table/TableWithActions";
import { packageService } from "../services/packageService";
import { userService } from "../services/userService";

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
      <SectionLayout
        heading={
          selectedSection === "Drivers"
            ? "Manage Drivers"
            : selectedSection === "Clients"
            ? "Manage Clients"
            : "Manage Orders"
        }
        selectedSection={selectedSection}
        showCreateButton={selectedSection === "Orders"}
        onCreateButtonClick={handleCreateOrder}
      >
        <TableWithActions
          columns={columns}
          data={data}
          loading={loading}
          onDelete={handleDeleteOrder}
        />
      </SectionLayout>
    </Box>
  );
};

export default ManagerPage;
