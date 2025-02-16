import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/ormconfig";
import { Client } from "../models/Client";
import { Driver } from "../models/Driver";
import { Manager } from "../models/Manager";
import { User } from "../models/User";
import { validateFields } from "../utils/validationUtils";
import { checkIfExists } from "../utils/repositoryUtils";

export const createUser = async (req: any, res: any) => {
  const { username, password, role, info } = req.body;

  try {
    // Check if the username already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const validInfo = validateFields(info, ["name", "email", "phone"]);

    if (!validInfo) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, email, phone" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      username,
      password_hash: passwordHash,
      role,
    });

    await userRepository.save(newUser);

    let success = false;

    if (role == "driver") {
      success = await createDriver(info, newUser);
    } else if (role == "client") {
      success = await createClient(info, newUser);
    } else if (role == "manager") {
      /// need to add some restriction who can create manager
      success = await createManager(info, newUser);
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    if (success) {
      return res.status(201).json({ message: "User created successfully" });
    } else {
      userRepository.delete(newUser);
      return res
        .status(400)
        .json({ message: role + " already exists, please check info" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: any, res: any) => {
  const { id } = req.params;
  const { username, password, info } = req.body;

  //// transactional database update --- to keep data consistant
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userPayload = req.user;

    const userRepository = queryRunner.manager.getRepository(User);

    // Find the user to update
    const userToUpdate = await userRepository.findOneBy({ user_id: id });
    if (!userToUpdate) {
      await queryRunner.rollbackTransaction();
      return res.status(404).json({ message: "User not found" });
    }

    // Authorization check
    if (
      userPayload.role !== "manager" &&
      userPayload.user_id !== userToUpdate.user_id
    ) {
      await queryRunner.rollbackTransaction();
      return res
        .status(403)
        .json({ message: "Not authorized to update this user" });
    }

    // Update fields if provided
    if (username) {
      const existingUser = await userRepository.findOneBy({ username });
      if (existingUser && existingUser.user_id !== userToUpdate.user_id) {
        await queryRunner.rollbackTransaction();
        return res.status(400).json({ message: "Username is already taken" });
      }
      userToUpdate.username = username;
    }

    if (password) {
      const saltRounds = 10;
      userToUpdate.password_hash = await bcrypt.hash(password, saltRounds);
    }

    await userRepository.save(userToUpdate);

    // Update role-specific information
    if (info) {
      if (userToUpdate.role === "client") {
        const clientRepository = AppDataSource.manager.getRepository(Client);
        let client = await clientRepository.findOneBy({ user: userToUpdate });
        if (client) {
          client.name = info.name || client.name;
          client.email = info.email || client.email;
          client.phone = info.phone || client.phone;
          client.address = info.address || client.address;
          await clientRepository.save(client);
        }
      } else if (userToUpdate.role === "driver") {
        const driverRepository = AppDataSource.manager.getRepository(Driver);
        let driver = await driverRepository.findOneBy({ user: userToUpdate });
        if (driver) {
          driver.name = info.name || driver.name;
          driver.email = info.email || driver.email;
          driver.phone = info.phone || driver.phone;
          await driverRepository.save(driver);
        }
      } else if (userToUpdate.role === "manager") {
        const managerRepository = queryRunner.manager.getRepository(Manager);
        let manager = await managerRepository.findOneBy({ user: userToUpdate });
        if (manager) {
          manager.name = info.name || manager.name;
          manager.email = info.email || manager.email;
          manager.phone = info.phone || manager.phone;
          await managerRepository.save(manager);
        }
      }
    }

    await queryRunner.commitTransaction();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await queryRunner.release();
  }
};

export const deleteUser = async (req: any, res: any) => {
  const { id } = req.params;

  //// transactional database update --- to keep data consistant
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepository = queryRunner.manager.getRepository(User);
    const userPayload = req.user;

    // Find the current user by ID
    const currUser = await userRepository.findOneBy({
      user_id: userPayload?.user_id,
    });

    if (currUser?.role == "manager") {
      const UserTodelete = await userRepository.findOneBy({ user_id: id });
      await userRepository.delete({ user_id: UserTodelete?.user_id });
    } else if (id != currUser?.user_id) {
      await queryRunner.rollbackTransaction();
      return res
        .status(400)
        .json({ message: "Not authorized to delete this user" });
    }

    await queryRunner.commitTransaction();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    return res.status(400).json({ message: error.message });
  } finally {
    await queryRunner.release();
  }
};

export const getUser = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const userPayload = req.user;

    if (userPayload.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userRepository = AppDataSource.getRepository(User);

    let findUser = await userRepository.findOneBy({ user_id: id });
    // Fetch all users with their associated client or driver details

    if (findUser) {
      findUser = await userRepository.findOne({
        where: { user_id: id },
        relations: ["client", "driver", "manager"],
      });
    } else {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json(findUser);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const userPayload = req.user;

    if (userPayload.role !== "manager") {
      return res.status(403).json({ message: "Access denied" });
    }

    const userRepository = AppDataSource.getRepository(User);

    // Fetch all users with their associated client or driver details
    const users = await userRepository.find({
      relations: ["client", "driver", "manager"],
    });

    return res.status(200).json(users);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserInfo = async (req: any, res: any) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userPayload = req.user;

    // Find the current user by ID
    const currUser = await userRepository.findOneBy({
      user_id: userPayload?.user_id,
    });

    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let record: Client | Driver | Manager | null = null;

    // Role-based logic to find the associated record
    if (currUser.role === "client") {
      const clientRepository = AppDataSource.getRepository(Client);
      record = await clientRepository.findOne({
        where: { user_id: currUser.user_id },
        relations: ["packages", "user"],
      });
    } else if (currUser.role === "driver") {
      const driverRepository = AppDataSource.getRepository(Driver);
      record = await driverRepository.findOne({
        where: { user_id: currUser.user_id },
        relations: ["packages", "user"],
      });
    } else if (currUser.role === "manager") {
      const managerRepository = AppDataSource.getRepository(Manager);
      record = await managerRepository.findOne({
        where: { user_id: currUser.user_id },
        relations: ["user"],
      });
    }

    if (record) {
      const info = record.getInfo();
      return res.status(200).json({ message: "Request successful", info });
    } else {
      return res.status(404).json({ message: "Record not found for the user" });
    }
  } catch (err) {
    console.error("Error finding user info:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createClient = async (info: any, user: User) => {
  const clientRepository = AppDataSource.getRepository(Client);
  //validateFields(info, ['name', 'email', 'phone'])

  // Check if client already exists
  const exists = await checkIfExists(
    clientRepository,
    { name: info.name, email: info.email, phone: info.phone },
    "Client"
  );

  if (exists === null) {
    const newClient = clientRepository.create({
      name: info.name,
      email: info.email,
      phone: info.phone,
      address: info.address || "",
      user: user,
    });

    await clientRepository.save(newClient);

    return true;
  }

  return false;
};

const createDriver = async (info: any, user: User) => {
  const driverRepository = AppDataSource.getRepository(Driver);

  // Validate required fields
  //validateFields(info, ['name', 'email', 'phone']);

  // Check if driver already exists
  const exists = await checkIfExists(
    driverRepository,
    { name: info.name, email: info.email, phone: info.phone },
    "Driver"
  );

  if (exists === null) {
    const newDriver = driverRepository.create({
      name: info.name,
      email: info.email,
      phone: info.phone,
      user: user,
    });

    await driverRepository.save(newDriver);
    return true;
  }

  return false;
};

const createManager = async (info: any, user: User) => {
  const managerRepository = AppDataSource.getRepository(Manager);

  // Validate required fields
  //validateFields(info, ['name', 'email', 'phone']);

  // Check if manager already exists
  const exists = await checkIfExists(
    managerRepository,
    { name: info.name, email: info.email, phone: info.phone },
    "Manager"
  );

  if (exists === null) {
    const newManager = managerRepository.create({
      name: info.name,
      email: info.email,
      phone: info.phone,
      user: user,
    });
    await managerRepository.save(newManager);

    return true;
  }

  return false;
};
