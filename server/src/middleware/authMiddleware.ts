import { NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "default_secret";


export interface JwtPayload {
  user_id: number;
  username: string;
  role: string;
}

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware to protect routes requiring authentication.
 * Works for all user types: drivers, businesses, and admins.
 */
export const protect = async (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Ensure the JWT secret is defined
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      // Attach the decoded payload to the request object
      req.user = decoded;

      // Pass control to the next middleware/handler
      return next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // Return 401 (Unauthorized) if no token is provided
  return res.status(401).json({ message: "Not authorized, no token provided" });
};


