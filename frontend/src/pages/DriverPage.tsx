import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import SectionLayout from "../components/common/section/SectionLayout";
import TableWithActions from "../components/common/table/TableWithActions";
import { packageService } from "../services/packageService";

const DriverPage = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("My Orders");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sections = ["My Orders", "Available Orders"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedSection === "My Orders") {
          response = await packageService.getMyPackages();
        } else if (selectedSection === "Available Orders") {
          //response = await packageService.getAvailableDeliveries();
        }

        if (response && Array.isArray(response.data)) {
          const formattedDeliveries = response.data.map((pkg: any) => ({
            package_id: pkg.package_id,
            delivery_address: pkg.delivery_address,
            delivery_zone: pkg.delivery_zone || "N/A",
            delivery_status: pkg.delivery_status || "Pending",
            pickup_time: pkg.pickup_time || "N/A",
            delivery_time: pkg.delivery_time || "N/A",
          }));
          setData(formattedDeliveries);
        } else {
          console.error("Expected an array but got:", response);
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSection]);

  const handleNavigation = (section: string) => {
    setSelectedSection(section);
  };

  const handleDeleteDelivery = async (packageId: number) => {
    try {
      await packageService.deleteDelivery(packageId);
      setData((prevData) =>
        prevData.filter((pkg) => pkg.package_id !== packageId)
      );
    } catch (error) {
      console.error("Error deleting delivery:", error);
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
        heading="Driver Dashboard"
      />
      <SectionLayout
        heading={
          selectedSection === "My Orders"
            ? "Manage My Orders"
            : "Manage Available Orders"
        }
        selectedSection={selectedSection}
      >
        <TableWithActions
          columns={columns}
          data={data}
          loading={loading}
          onDelete={handleDeleteDelivery}
        />
      </SectionLayout>
    </Box>
  );
};

export default DriverPage;
