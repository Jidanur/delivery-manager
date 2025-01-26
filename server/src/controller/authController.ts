import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";

const jwtSecret = process.env.JWT_SECRET || "default_secret";

export const createUser = async (req: any, res: any) => {
  const { username, password, role } = req.body;

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
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login endpoint
export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRATION || "1h" } //TODO: Lets change 1h to less time
    );

    return res.status(200).json({ message: "Login successful",role: user.role ,  token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
