import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/ormconfig";
import { User } from "../models/User";

const jwtSecret = process.env.JWT_SECRET || "default_secret"; //TODO: fix this lateryo


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

    const token = jwt.sign({ user_id: user.user_id, username:user.username, role:user.role }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRATION || "1h", //TODO: change token time when token refreshing implemented
    });

    return res
      .status(200)
      .json({ message: "Login successful", role: user.role, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
