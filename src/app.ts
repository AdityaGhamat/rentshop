import express from "express";
import type { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiRoutes from "./api.routes";
import dotenv from "dotenv";

class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }
  private middleware() {
    dotenv.config();
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private routes() {
    this.app.use("/api", ApiRoutes);
  }
  private errorHandler() {
    this.app.use((_req, res) =>
      res.status(404).json({ message: "Route Not Found" })
    );

    this.app.use((err: any, _req: any, res: any, _next: any) => {
      console.error(err);
      res
        .status(err?.status || 500)
        .json({ message: err?.message || "Internal server error" });
    });
  }
  public async start(port: number) {
    this.app.listen(port, () => {
      console.log(`server is started on ${port}`);
    });
  }
}
export default new Server();
