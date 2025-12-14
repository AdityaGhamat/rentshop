import authService from "./services/auth.service";
import type { Request, Response } from "express";
import { asyncHandler } from "@core/utility/middleware";
class AuthController {
  public loginWithEmail = asyncHandler(async (req: Request) => {
    return authService.loginWithEmail(req.body);
  });
}

export default new AuthController();
