import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SectionLayout from "../../components/section/SectionLayout";
import GeneralTable from "../../components/table/GeneralTable";
import { packageService } from "../../services/packageService";
import {
  DeliveryStatus,
  DeliveryZone,
  PackageInfo,
  ServiceType,
} from "../../types/packageInterfaces";

const DriverPage = () => {
  const [selectedSection, setSelectedSection] = useState("My Orders");
  const [data, setData] = useState<PackageInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const sections = ["My Orders", "Available Orders"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = [];
        if (selectedSection === "My Orders") {
          response = await packageService.getMyPackages();
          response = response.data;
        } else if (selectedSection === "Available Orders") {
          response = await packageService.getAllPackages();
          response = response.data.filter(
            (pkg: PackageInfo) => pkg.driver === null
          );
        }
        console.log(response);
        if (response && Array.isArray(response)) {
          const formattedDeliveries = response.map((pkg: PackageInfo) => ({
            package_id: pkg.package_id,
            delivery_address: pkg.delivery_address,
            service_type: pkg.service_type || ServiceType.STANDARD,
            delivery_zone: pkg.delivery_zone || DeliveryZone.ZONE_1,
            delivery_status: pkg.delivery_status || DeliveryStatus.PENDING,
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
