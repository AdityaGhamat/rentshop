import { z } from "zod";

export const LoginWithEmailDto = z.object({
  email: z
    .string()
    .min(5, { message: "Minimum 5 characters are required" })
    .max(50, { message: "Maximum 50 characters are granted" }),
  password: z
    .string()
    .min(6, { message: "Minimum 6 characters are required" })
    .max(20, { message: "Maximum 50 Characters are required" }),
});

export type LoginWithEmailType = z.infer<typeof LoginWithEmailDto>;
