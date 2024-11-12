import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}

/*
    This middleware protects certain routes which will require authentication
    for our scenario all three types of users: drivers, businesses, 
    and admins require authentication
*/

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if the authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;

      // Attach the user information to the request object
      req.user = { id: decoded.id }; // This needs to come from a real DB

      // Pass control to the next middleware/handler
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      // Return 401 (Unauthorized) if token verification fails
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // Return 401 (Unauthorized) if no token is found
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
