import { z } from "zod";

export const LoginWithPhoneDto = z.object({
  phone: z
    .string()
    .min(10, { message: "Minimum 10 digits required" })
    .max(10, { message: "maximum 10 digits required" }),
});
export type LoginWithPhoneType = z.infer<typeof LoginWithPhoneDto>;
