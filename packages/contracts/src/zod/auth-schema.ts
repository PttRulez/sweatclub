import { z } from "zod";

export const LoginSchema = z.object({
  password: z.string(),
  username: z.string(),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const RegisterSchema = LoginSchema.extend({
  name: z.string(),
  cityId: z.number().optional(),
});

export type RegisterData = z.infer<typeof RegisterSchema>;
