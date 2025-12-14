import { Router } from "express";
import type { Request, Response } from "express";
import { authRoutes } from "@auth";
const app = Router();
app.use("/", (req: Request, res: Response) => {
  res.json({
    message: "Server has been initialized",
  });
});
app.use("/auth", authRoutes);
export default app;
