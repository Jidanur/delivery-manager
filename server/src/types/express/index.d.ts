import { Request } from "express";

declare global {
  namespace Express {
    /*
      Extending the Express Request type globally
      to contain user which has an id of type string
      This is used in authMiddleware.ts when req.user is accessed
    */
    interface Request {
      user?: { id: string };
    }
  }
}
