import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../error/ApiError';

const secretKey = process.env.JWT_SECRET_KEY!;

interface PayloadToken {
  id: number;
}

export const createToken = (data: PayloadToken) => {
  const expiresIn = '1h';
  return jwt.sign(data, secretKey, { expiresIn });
};


export const verifyToken = (req:Request,res:Response,next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer')){
    return next(new ApiError("Authorization header is missing or malformed",401))
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey) as PayloadToken
    req.user = {id: decoded.id}
    next()
  } catch (error) {
    next(new ApiError("Invalid Token",401))
  }
}