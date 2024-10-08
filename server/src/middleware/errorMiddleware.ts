import { Request, Response, NextFunction } from "express";

/*  
    Error Handling Middleware
    Centralized error handler capturing any errors
    and sending back custom error responses 
*/

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* 
    if the status code is not set to the default (200)
    we change the code to 500 due to server error 
  */
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
