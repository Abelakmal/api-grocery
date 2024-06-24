import { NextFunction, Request, Response } from "express";

export class TestController {

    public getTest (req:Request, res:Response, next:NextFunction) {
        try {
            res.status(200).json({
                data: "ok"
            });
        } catch (error) {
            next()
        }
    }
}