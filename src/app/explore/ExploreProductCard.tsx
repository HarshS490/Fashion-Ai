import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ExploreProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block aspect-[3/4] rounded-lg border border-zinc-200 shadow-md"
    >
      <div className="relative h-1/2 overflow-hidden rounded-lg">
        {product && (
          <Image
            alt={`Image of ${product.name}`}
            src={product.image}
            fill
            className="h-full w-full cursor-pointer rounded-md object-cover transition-transform duration-700 group-hover:scale-125"
          />
        )}
      </div>
      <div className="flex h-[60%] flex-col justify-between">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-center text-xl underline-offset-2 group-hover:underline">
              {product.name}
            </h3>
            <span className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={cn(
                    "h-4 w-4",
                    idx < product.stars
                      ? "fill-yellow-300 stroke-yellow-400"
                      : "fill-yellow-50 stroke-yellow-300",
                  )}
                />
              ))}
            </span>
          </div>
          <div className="mt-2 text-sm text-zinc-600">
            {product.description}
          </div>
        </div>
        <div className="mb-5 flex justify-between px-5">
          <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink className="size-6 text-muted-foreground" />
          </div>
          <div className="text-zinc-800">₹ {product.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreProductCard;
