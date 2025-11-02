import { Router } from "express";
import type { Request, Response } from "express";
const app = Router();
app.use("/", (req: Request, res: Response) => {
  res.json({
    message: "Server has been initialized",
  });
});
export default app;
