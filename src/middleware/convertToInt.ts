import { NextFunction, Request, Response } from "express";

export const convertToInt =
  (fields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    fields.forEach((field: any) => {
      if (req.body[field]) {
        req.body[field] = parseInt(req.body[field], 10);
      }
    });
    next();
  };
