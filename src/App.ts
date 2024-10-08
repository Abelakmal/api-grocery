import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { clientUrl, imgUploadPath, PORT } from "./helper/config";
import cors from "cors";
import { TestRouter } from "./routers/TestRouter";
import { UserRouter } from "./routers/UserRouter";
import { ApiError } from "./error/ApiError";
import { AuthRouter } from "./routers/AuthRouter";
import { AddressRouter } from "./routers/AddressRouter";
import { ProductRouter } from "./routers/ProductRouter";
import { CategoryRouter } from "./routers/CategoryRouter";
import { CartRouter } from "./routers/CartRouter";
import { StoreBranchRouter } from "./routers/StoreBranchRouter";
import { AdminRouter } from "./routers/AdminRouter";
import { StockRouter } from "./routers/StockRouter";
import cookieParser from "cookie-parser";
import { TransactionRouter } from "./routers/TransactionRouter";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleNotFound();
    this.handleError();
  }

  private configure(): void {
    (BigInt.prototype as any).toJSON = function () {
      return this.toString();
    };
    this.app.use(
      cors({
        origin: clientUrl,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", ""],
        credentials: true,
      })
    );
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private routes(): void {
    const router = new TestRouter();
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();
    const addressRouter = new AddressRouter();
    const productRouter = new ProductRouter();
    const categoryRouter = new CategoryRouter();
    const cartRouter = new CartRouter();
    const storeBranchRouter = new StoreBranchRouter();
    const adminRouter = new AdminRouter();
    const stockRouter = new StockRouter();
    const transactionRouter = new TransactionRouter();

    this.app.use("/api/media", express.static(imgUploadPath));
    this.app.use("/api/test", router.getRouter());
    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/auth", authRouter.getRouter());
    this.app.use("/api/address", addressRouter.getRouter());
    this.app.use("/api/product", productRouter.getRouter());
    this.app.use("/api/category", categoryRouter.getRouter());
    this.app.use("/api/cart", cartRouter.getRouter());
    this.app.use("/api/store-branch", storeBranchRouter.getRouter());
    this.app.use("/api/admin", adminRouter.getRouter());
    this.app.use("/api/stock", stockRouter.getRouter());
    this.app.use("/api/transactions", transactionRouter.getRouter());
  }

  private handleNotFound(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).json({ error: "Not found" });
      } else {
        next();
      }
    });
  }

  private handleError() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          res.status(err.statusCode).json({
            error: err.message,
          });
        } else {
          console.error("Error: ", err.stack);
          res.status(500).json({ error: err.message });
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
