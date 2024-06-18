import type { Product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: Change stars, price and category according to design made by Harsh
const ProductCard = ({ about: product }: { about: Product }) => {
  return (
    <Card className="min-w-64 max-w-prose text-center">
      <CardHeader>
        <CardTitle className="mb-3">{product.name}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <p className="truncate text-left">{product.category}</p>
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: product.stars }).map((_, idx) => (
              <Star
                key={idx}
                className={cn(
                  "h-4 w-4",
                  idx <= product.stars && "fill-yellow-300 stroke-yellow-400",
                )}
              />
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="truncate text-zinc-700">
          {product.description.slice(0, 100)}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <div className="mx-auto h-[1px] w-3/4 bg-zinc-500" aria-hidden />
        <p className="ml-auto pr-5">₹ {product.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
