import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { PORT } from "./helper/config";
import cors from "cors";
import { TestRouter } from "./routers/TestRouter";
import { UserRouter } from "./routers/UserRouter";
import { ApiError } from "./error/ApiError";
import { AuthRouter } from "./routers/AuthRouter";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private routes(): void {
    const router = new TestRouter();
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();

    this.app.use("/api/test", router.getRouter());
    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/auth", authRouter.getRouter())
  }

  private handleError() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          res.status(err.statusCode).json({
            error: err.message,
          });
        } else {
          console.log(err);     
          next();
        }
      }
    );

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction): void => {
        if (req.path.includes("/api/")) {
          res.status(404).send("Not found");
        } else {
          next();
        }
      }
    );

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      }
    );
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  }

  public getApp() {
    return this.app;
  }
}
