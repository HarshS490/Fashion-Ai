import { z } from "zod";

export const login_continue = z.object({
  username: z.string().min(3),
});
