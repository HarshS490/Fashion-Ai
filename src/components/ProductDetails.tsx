"use client";
import { Product } from "@prisma/client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

import {
  PlusIcon,
  MinusIcon,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";


type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const [count, setCount] = useState(1);
  const [expandDescription, setExpandDescription] = useState(false);
  const containerRef = useRef(null);
  const handleChange = (e) => {
    setCount(e.target.value);
  };

  const handleIncrement = () => {
    if (count < 6) {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleExpand = ()=>{
    setExpandDescription(!expandDescription);
  }

  return (
    <div className="mx-auto w-5/6">
      <div className="flex w-full flex-col items-center gap-8 p-4 md:flex md:flex-row md:justify-evenly md:items-start min-w-[520px]">
        <div className="flex w-9/12 md:w-3/5 items-center justify-center p-4 md:w-2/4 min-w-80 lg:h-[450px]">
          <img
            src={`${product.image}`}
            alt="product image"
            width={350}
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        
        <div className="flex flex-col gap-2 p-4 w-9/12 md:w-2/4 ">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <p className="text-sm">
            {product.stock >= 1 ? (
              <span className="block font-semibold text-green-700">
                In Stock
              </span>
            ) : (
              <span className="block font-semibold text-red-700">
                Out of Stock
              </span>
            )}
            <Link href={""} className="text-blue-700 hover:underline hover:underline-offset-2">
              {product.sellerAccountId}
            </Link>
          </p>
          <hr className="border-slate-300" />

          
          <div className="my-2">
            <p>Category: <span className="rounded-xl border border-gray-300 p-2 text-gray-500">{product.category}</span></p>
            <p className="text-2xl my-2">&#8377;{product.price}</p>
          </div>

          <div  ref={containerRef}>
            <Accordion type="multiple" className="">
              <AccordionItem value="projectDescription">
                <AccordionTrigger>About this Product</AccordionTrigger>
                <AccordionContent>
                  {product.description}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <div className="flex">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleIncrement}
              >
                {<PlusIcon></PlusIcon>}
              </Button>
              <input
                className="w-10 text-center focus:outline-none"
                onChange={handleChange}
                value={count}
              />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleDecrement}
              >
                {<MinusIcon></MinusIcon>}
              </Button>
            </div>
            <div className="flex justify-evenly gap-5">
              <Button variant={"default"}>
                Add to &nbsp;
                <ShoppingCart />
              </Button>
              <Button
                variant={"default"}
                className="bg-green-900 hover:bg-green-700"
              >
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
