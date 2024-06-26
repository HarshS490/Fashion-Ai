import { ProductType } from "@prisma/client";

export type ProductInput = {
  name: string;
  category: ProductType;
  description: string;
  price: number;
  sellerAccountId: string;
  image: string;
  stock: Array<{ size: string; quantity: number }>;
};
