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

  //if we are authenticating with a bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;

      // modified request type containing the user field with an id of type string
      req.user = { id: decoded.id }; // This needs to come from a real DB

      next(); //passes control to the next middleware/handler
    } catch (error) {
      //401 (Unauthorized) is returned if we are unable to verify the identity
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  //return 401 if no token is found
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export { protect };
