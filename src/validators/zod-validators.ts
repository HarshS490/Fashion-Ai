import { z } from "zod";

export const login_continue = z.object({
  username: z.string().min(3),
});

export const new_product = z.object({
  name: z.string().min(1),
  brand_name: z.string(),
  description: z.string().min(1),
  sale_price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
});
