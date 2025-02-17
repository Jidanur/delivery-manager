import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import SectionLayout from "../components/common/section/SectionLayout";
import GeneralTable from "../components/common/table/GeneralTable";
import { packageService } from "../services/packageService";
import { PackageInfo } from "../types/packageInterfaces";

const DriverPage = () => {
  const [selectedSection, setSelectedSection] = useState("My Orders");
  const [data, setData] = useState<PackageInfo[]>([]);
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
          response = await packageService.getAllPackages();
          response = response.filter(
            (pkg: PackageInfo) => pkg.driver_id === null
          );
        }

        if (response && Array.isArray(response)) {
          const formattedDeliveries = response.map((pkg: PackageInfo) => ({
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
        <GeneralTable columns={columns} data={data} loading={loading} />
      </SectionLayout>
    </Box>
  );
};

export default DriverPage;
