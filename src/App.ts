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
import { AddressRouter } from "./routers/AddressRouter";
import { ProductRouter } from "./routers/ProductRouter";
import { CategoryRouter } from "./routers/CategoryRouter";
import { CartRouter } from "./routers/CartRouter";
const cookieParser = require("cookie-parser");

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
        origin: "http://localhost:5173",
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
    const categoryRouter = new CategoryRouter()
    const cartRouter =  new CartRouter()

    this.app.use(
      "/api/media/users",
      express.static(__dirname + "/images/users")
    );
    this.app.use(
      "/api/media/products",
      express.static(__dirname + "/images/products")
    );
    this.app.use(
      "/api/media/categories",
      express.static(__dirname + "/images/categories")
    );
    this.app.use("/api/test", router.getRouter());
    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/auth", authRouter.getRouter());
    this.app.use("/api/address", addressRouter.getRouter());
    this.app.use("/api/product", productRouter.getRouter());
    this.app.use("/api/category", categoryRouter.getRouter())
    this.app.use("/api/cart", cartRouter.getRouter())
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
