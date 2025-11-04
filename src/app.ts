import express from "express";
import type { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ApiRoutes from "./api.routes";
import { loadDatabase } from "@core/utility";
import {
  requestContext,
  requestLogger,
  responseWrapper,
  notFoundHandler,
  errorHandler,
} from "@core/utility/middleware";

class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorMiddleware();
  }
  private middleware() {
    this.app.use(requestContext());
    this.app.use(requestLogger());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(responseWrapper());
  }

  private routes() {
    this.app.use("/api", ApiRoutes);
  }

  private errorMiddleware() {
    this.app.use(notFoundHandler());
    this.app.use(errorHandler());
  }

  public async start(port: number) {
    await loadDatabase();
    const server = this.app.listen(port);
    return server;
  }
}
export default new Server();
