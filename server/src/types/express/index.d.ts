import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

declare global {
  namespace Express {
    /*
      Extending the Express Request type globally
      to contain user which has an id of type string
      This is used in authMiddleware.ts when req.user is accessed
    */
    interface Request extends ExpressRequest {
      user?: {
        id: string;
        name: string;
        email: string;
        pronouns: string;
        role: string;
      };
    }

    interface Response extends ExpressResponse {
      status: (code: number) => Response;
      json: (body: any) => Response;
    }
  }
}
