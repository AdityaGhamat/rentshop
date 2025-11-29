import { z } from "zod";
import { env } from "@/modules/core/utility";
export const VerifyPhoneOtpAndCompleteRegisterDto = z.object({
  otp: z.string().min(env.OTP_LENGTH).max(env.OTP_LENGTH),
  phone: z
    .string()
    .min(10, { message: "minimum 10 integers" })
    .max(10, { message: "maximum 10 integers" }),
  name: z
    .string()
    .min(3, { message: "minimum 3 characters" })
    .max(20, { message: "minimum 20 characters" }),
  email: z.string().min(5).max(50).optional(),
  ip: z.string().min(10).max(100).optional(),
  userAgent: z.string().optional(),
});

export type VerifyPhoneOtpAndCompleteRegisterType = z.infer<
  typeof VerifyPhoneOtpAndCompleteRegisterDto
>;
