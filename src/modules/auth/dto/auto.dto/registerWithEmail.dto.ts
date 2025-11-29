import { z } from "zod";

export const RegisterWithEmailDto = z.object({
  name: z.string().min(3).max(20),
  email: z.string().min(5).max(50),
  password: z.string(),
});

export type RegisterWithEmailtype = z.infer<typeof RegisterWithEmailDto>;
