import { NextFunction, Request, Response } from "express";
import jwt, { Secret, TokenExpiredError } from "jsonwebtoken";
import { ApiError } from "../error/ApiError";

const secretKey = process.env.JWT_SECRET_KEY!;
const secretKeyRefreshToken: Secret = process.env.JWT_SECRET_REFRESH_TOKEN!;

interface PayloadToken {
  id: number;
  isSuper?: boolean;
  email?: string;
}

export const createToken = (data: PayloadToken) => {
  const expiresIn = "1d";
  return jwt.sign(data, secretKey, { expiresIn });
};

export const createRefreshToken = (data: {}) => {
  const expiresIn = "1d";
  return jwt.sign({ data }, secretKeyRefreshToken, { expiresIn });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(
      new ApiError("Authorization header is missing or malformed", 401)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey) as PayloadToken;

    if (decoded.isSuper !== undefined) {
      req.admin = { id: decoded.id, isSuper: decoded.isSuper };
    } else {
      req.user = { id: decoded.id, email: decoded.email };
    }

    next();
  } catch (error) {
    next(new ApiError("Invalid Token", 401));
  }
};

interface IJwt {
  data: PayloadToken;
}

export const verifyRefreshToken = (
  refreshToken: string
): Promise<PayloadToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, secretKeyRefreshToken, (err, payload) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          reject(new ApiError("Token expired", 401));
        } else {
          reject(new ApiError("Invalid token", 401));
        }
      } else {
        const { data } = payload as IJwt;
        resolve(data);
      }
    });
  });
};
