import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import { PORT } from "./helper/config";
import cors from "cors";
import { TestRouter } from "./routers/TestRouter";

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
  }

  private routes(): void {
    const router = new TestRouter();
    this.app.use("/api/test", router.getRouter());
  }

  private handleError() {
    this.app.use((req: Request, res: Response, next: NextFunction): void => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not found");
      } else {
        next();
      }
    });

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
