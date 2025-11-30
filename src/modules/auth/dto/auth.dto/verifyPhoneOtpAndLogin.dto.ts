import { z } from "zod";
import { env } from "@/modules/core/utility";
export const VerifyPhoneOtpAndCompleteLoginDto = z.object({
  otp: z
    .string()
    .min(env.OTP_LENGTH, {
      message: `Minimum ${env.OTP_LENGTH} characters required`,
    })
    .max(env.OTP_LENGTH, {
      message: `Maximum ${env.OTP_LENGTH} characters are required`,
    }),
  phone: z
    .string()
    .min(10, { message: "Minimum 10 characters are required" })
    .max(10, { message: "Maximum 10 characters are required" }),
  ip: z.string().min(10).max(100).optional(),
  userAgent: z.string().optional(),
});
export type VerifyPhoneOtpAndCompleteLoginType = z.infer<
  typeof VerifyPhoneOtpAndCompleteLoginDto
>;
