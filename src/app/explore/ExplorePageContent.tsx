"use server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import ExploreProductCard from "./ExploreProductCard";

const ExplorePageContent = async () => {
  const products = await db.product.findMany({});

  return (
    <div>
      <div>
        <h1 className="mt-5 text-3xl tracking-tight">Trending products</h1>
        <div>
          <Carousel className="my-5 min-h-fit" opts={{ align: "start" }}>
            <CarouselContent className="-ml-5">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="h-full basis-1/2 pl-5 md:basis-1/3 lg:basis-1/4"
                >
                  <ExploreProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-5 lg:-left-10" />
            <CarouselNext className="right-0 md:-right-5 lg:-right-10" />
          </Carousel>
        </div>
      </div>
      <div>
        <h1 className="mt-5 text-3xl tracking-tight">Just for you</h1>
        <div>
          <Carousel className="my-5 min-h-fit" opts={{ align: "start" }}>
            <CarouselContent className="-ml-5">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="h-full basis-1/2 pl-5 md:basis-1/3 lg:basis-1/4"
                >
                  <ExploreProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-5 lg:-left-10" />
            <CarouselNext className="right-0 md:-right-5 lg:-right-10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ExplorePageContent;
