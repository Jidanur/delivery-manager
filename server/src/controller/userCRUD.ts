import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/ormconfig";
import { Client } from "../models/Client";
import { Driver } from "../models/Driver";
import { User } from '../models/User';


export const createUser = async (req: any, res: any) => {
  const { username, password, role ,info} = req.body;

  try {
    // Check if the username already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
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

    if(role == "driver"){
        const driverRepository = AppDataSource.getRepository(Driver);
        const newDriver = driverRepository.create({
            name: info.name,
            email:info.email,
            phone: info.phone,
            user: newUser
        })

        await driverRepository.save(newDriver);
    }
    else if(role == "client"){

        const clientRepository = AppDataSource.getRepository(Client);
        const newClient = clientRepository.create({
            name: info.name,
            email:info.email,
            phone: info.phone,
            address: info.address,
            user: newUser
        })

        await clientRepository.save(newClient);
    }

    
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getUserInfo = async (req: any, res: any) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userPayload = req.user;

    // Find the current user by ID
    const currUser = await userRepository.findOneBy({ user_id: userPayload?.user_id });

    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let record: Client | Driver | null = null;

    // Role-based logic to find the associated record
    if (currUser.role === "client") {
      const clientRepository = AppDataSource.getRepository(Client);
      record = await clientRepository.findOne({
        where: { user_id: currUser.user_id },
      });
    } else if (currUser.role === "driver") {
      const driverRepository = AppDataSource.getRepository(Driver);
      record = await driverRepository.findOne({
        where: { user_id: currUser.user_id },
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
