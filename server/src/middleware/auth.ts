import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   username: string;
// }

export const authenticateToken = (req: Request, res: Response, _next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }
  return res.sendStatus(403); // Forbidden if token is invalid or expired
};
