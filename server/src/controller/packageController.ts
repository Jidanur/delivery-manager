////creating package
///updating package -- assigning driver, changing address,delivery_zone and updating status,time
///getting package -- url, generate qr-url, checking access

import { AppDataSource } from "../config/ormconfig";
import { Driver } from "../models/Driver";
import { Package } from "../models/Package";
import { User } from "../models/User";
import { ServiceType } from "../types/express/PackageInterface";
import { validateFields } from "../utils/validationUtils";

export const createPackage = async (req: any, res: any) => {
  const userPayload = req.user;
  const { packageInfo } = req.body;
  try {
    if (userPayload.role === "driver") {
      return res.status(403).json({
        message:
          "Drivers are not allowed to create packages. Please contact a manager.",
      });
    }

    const validInfo = validateFields(packageInfo, ["delivery_address"]);

    if (!validInfo) {
      return res.status(400).json({ message: "Invalid package information." });
    }

    let curr_client = null;
    const userRepository = AppDataSource.getRepository(User);

    if (userPayload.role == "client") {
      const cuur_user = await userRepository.findOne({
        where: { user_id: userPayload.user_id },
        relations: ["client"],
      });
      curr_client = cuur_user?.client;
    }

    const packageRepository = AppDataSource.getRepository(Package);
    const newPackage = packageRepository.create({
      delivery_address: packageInfo.delivery_address,
      delivery_zone: packageInfo.delivery_zone || null,
      service_type: packageInfo.service_type || ServiceType.STANDARD,
      client_id: curr_client?.client_id || packageInfo.client_id,
    });

    if(packageInfo.driver_id){
      const driverRepository = AppDataSource.getRepository(Driver);
      const cuur_driver = await driverRepository.findOne({
        where: { driver_id: packageInfo.driver_id },
      });

      if (cuur_driver) newPackage.driver = cuur_driver;
    }
    const savedPackage = await packageRepository.save(newPackage);

    return res.status(201).json({
      message: "Package created successfully.",
      package: savedPackage,
    });
  } catch (error) {
    console.error("Error creating Package:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePackage = async (req: any, res: any) => {
  const userPayload = req.user;
  const { packageId, updateInfo } = req.body;

  //// transactional database update --- to keep data consistant
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const packageRepository = queryRunner.manager.getRepository(Package);
    const existingPackage = await packageRepository.findOne({
      where: { package_id: packageId },
      relations: ["client", "driver"],
    });

    if (!existingPackage) {
      await queryRunner.rollbackTransaction();
      return res.status(404).json({ message: "Package not found." });
    }

    // Restrict updates based on user role
    const userRepository = AppDataSource.getRepository(User);
    const cuur_user = await userRepository.findOne({
      where: { user_id: userPayload.user_id },
      relations: ["client", "driver"],
    });

    if (
      userPayload.role === "client" &&
      existingPackage.client?.client_id !== cuur_user?.client.client_id
    ) {
      await queryRunner.rollbackTransaction();
      return res.status(403).json({
        message: "You do not have permission to update this package.",
      });
    }

    if (
      userPayload === "driver" &&
      existingPackage.driver?.driver_id !== cuur_user?.driver.driver_id
    ) {
      await queryRunner.rollbackTransaction();
      return res.status(403).json({
        message: "You do not have permission to update this package.",
      });
    }

    // Update package fields
    if (updateInfo.delivery_address)
      existingPackage.delivery_address = updateInfo.delivery_address;
    if (updateInfo.delivery_zone)
      existingPackage.delivery_zone = updateInfo.delivery_zone;
    if (updateInfo.delivery_status)
      existingPackage.delivery_status = updateInfo.delivery_status;
    if (updateInfo.driver_id) {
      const userRepository = AppDataSource.getRepository(User);
      const driver = await userRepository.findOne({
        where: { driver: { driver_id: updateInfo.driver_id } },
        relations: ["driver"],
      });
      if (driver?.driver) existingPackage.driver = driver.driver;
    }
    if (updateInfo.pickup_time)
      existingPackage.pickup_time = new Date(updateInfo.pickup_time);
    if (updateInfo.delivery_time)
      existingPackage.delivery_time = new Date(updateInfo.delivery_time);

    if (updateInfo.order_instructions)
      existingPackage.order_instructions = updateInfo.order_instructions;
    if (updateInfo.order_comment)
      existingPackage.order_comment = updateInfo.order_comment;

    const updatedPackage = await packageRepository.save(existingPackage);

    await queryRunner.commitTransaction();
    return res.status(200).json({
      message: "Package updated successfully.",
      package: updatedPackage,
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error updating package:", error);
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    queryRunner.release();
  }
};

export const getPackage = async (req: any, res: any) => {
  const { packageId } = req.params;

  try {
    const packageRepository = AppDataSource.getRepository(Package);
    const existingPackage = await packageRepository.findOne({
      where: { package_id: packageId },
      relations: ["client", "driver"],
    });

    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found." });
    }

    return res.status(200).json({
      message: "Package retrieved successfully.",
      package: existingPackage,
    });
  } catch (error) {
    console.error("Error retrieving package:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deletePackage = async (req: any, res: any) => {
  const userPayload = req.user;
  const { packageId } = req.params;

  try {
    const packageRepository = AppDataSource.getRepository(Package);

    // Check if the package exists
    const existingPackage = await packageRepository.findOne({
      where: { package_id: packageId },
      relations: ["client"],
    });

    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found." });
    }

    // Role-based access control
    const userRepository = AppDataSource.getRepository(User);
    const cuur_user = await userRepository.findOne({
      where: { user_id: userPayload.user_id },
      relations: ["client", "driver"],
    });

    if (
      userPayload.role === "client" &&
      existingPackage.client?.client_id !== cuur_user?.client.client_id
    ) {
      return res.status(403).json({
        message: "You do not have permission to delete this package.",
      });
    }

    if (userPayload.role === "driver") {
      return res.status(403).json({
        message: "You do not have permission to delete this package.",
      });
    }

    // Delete the package
    await packageRepository.remove(existingPackage);

    return res.status(200).json({
      message: "Package deleted successfully.",
      packageId,
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const myPackages = async (req: any, res: any) => {
  const userPayload = req.user; // Assuming `req.user` contains authenticated user info

  try {
    const userRepository = AppDataSource.getRepository(User);
    const packageRepository = AppDataSource.getRepository(Package);

    // Fetch the current user
    const curr_user = await userRepository.findOne({
      where: { user_id: userPayload.user_id },
      relations: ["client", "driver"],
    });

    if (!curr_user) {
      return res.status(404).json({ message: "User not found." });
    }

    let packages;

    if (userPayload.role === "client") {
      // Fetch the client entity linked to the user
      packages = await packageRepository.find({
        where: { client: { client_id: curr_user.client.client_id } },
        relations: ["driver", "client"],
      });
    } else if (userPayload.role === "driver") {
      // Fetch packages assigned to the driver
      packages = await packageRepository.find({
        where: { driver: { driver_id: curr_user.driver.driver_id } },
        relations: ["client", "driver"],
      });
    } else {
      return res.status(403).json({
        message: "You are not authorized to view packages.",
      });
    }

    return res.status(200).json({
      message: "Packages retrieved successfully.",
      data: packages,
    });
  } catch (error) {
    console.error("Error retrieving packages:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllPackages = async (req: any, res: any) => {
  try {
    const userPayload = req.user;
    const packageRepository = AppDataSource.getRepository(Package);

    if (userPayload.role === "client") { // driver need to see if more order available
      return res.status(403).json({ message: "Access denied" });
    }

    // Retrieve all packages
    const packages = await packageRepository.find({
      relations: ["client", "driver"], // Include related entities
    });

    return res.status(200).json({
      message: "All packages retrieved successfully.",
      data: packages,
    });
  } catch (error) {
    console.error("Error retrieving packages:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
