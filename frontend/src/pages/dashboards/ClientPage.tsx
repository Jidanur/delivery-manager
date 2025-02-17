import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import SectionLayout from "../../components/common/section/SectionLayout";
import TableWithActions from "../../components/common/table/TableWithActions";
import { packageService } from "../../services/packageService";

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
      <Sidebar
        sections={sections}
        selectedSection={selectedSection}
        onNavigate={handleNavigation}
        logoutPath="/logout"
        heading="Client Dashboard"
      />
      <SectionLayout
        heading={
          selectedSection === "Profile" ? "Manage Profile" : "Manage Orders"
        }
        selectedSection={selectedSection}
        showCreateButton={selectedSection === "Orders"}
        onCreateButtonClick={handleCreateOrder}
      >
        {selectedSection === "Profile" ? (
          <Typography variant="body1" align="center">
            Here you can manage your profile.
          </Typography>
        ) : (
          <TableWithActions
            columns={columns}
            data={data}
            loading={loading}
            onDelete={handleDeleteOrder}
          />
        )}
      </SectionLayout>
    </Box>
  );
};

export default ClientPage;
