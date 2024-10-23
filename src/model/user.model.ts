import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;