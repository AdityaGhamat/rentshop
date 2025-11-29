import { z } from "zod";

export const registerWithPhoneDto = z.object({
  phone: z
    .string({ message: "Required phone number" })
    .min(10, { message: "minimum 10 integers" })
    .max(10, { message: "maximum 10 integers" }),
});

export type registerWithPhoneType = z.infer<typeof registerWithPhoneDto>;
