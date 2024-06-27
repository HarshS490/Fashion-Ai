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
import Link from "next/link";

// TODO: Change stars, price and category according to design made by Harsh
const ProductCard = ({ about: product }: { about: Product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="max-w-prose text-center">
        <CardHeader>
          <CardTitle className="mb-3 truncate">{product.name}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span className="block truncate text-left text-xs uppercase">
              {product.category}
            </span>
            <span className="flex items-center justify-center gap-1">
              {Array.from({ length: product.stars }).map((_, idx) => (
                <Star
                  key={idx}
                  className={cn(
                    "h-4 w-4",
                    idx <= product.stars && "fill-yellow-300 stroke-yellow-400",
                  )}
                />
              ))}
            </span>
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
    </Link>
  );
};

export default ProductCard;
