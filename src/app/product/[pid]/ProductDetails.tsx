"use client";
import { Product } from "@prisma/client";
import React, { useState, useRef ,useEffect} from "react";
import { Button } from "../../../components/ui/button";
import ReactStars from "react-rating-stars-component";
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
import Image from "next/image";


type Props = {
  pid: string;
};

export default function ProductDetails({ pid }: Props) {
  const [product,setProduct] = useState<Product|null>(null);
  const [count, setCount] = useState(1);
  const containerRef = useRef(null);
  const baseUrl = global.window?.location?.origin;

  useEffect(
    ()=>{
      const fetchData = async ()=>{
        try{
          const res = await fetch(`${baseUrl}/api/product/${pid}`);
          const data = await res.json();
          if(!data.product){
            throw new Error("Product not found");
          }
          setProduct(data.product);
        }catch(error){
          console.log("Error fetching data",error);
        }
      }

      fetchData();
    },[baseUrl,pid]
  )

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

  const ratingChanged = (newRating: number) => {
    if(product){
      setProduct((prev) => ({
        ...prev!,
        stars: newRating,
      }));
    }
  };

  return (
    <div className="mx-auto w-5/6">
      <div className="flex w-full flex-col items-center gap-8 p-4 md:flex md:flex-row md:justify-evenly md:items-start min-w-[520px] md:min-w-[800px]">
        <div className="flex w-9/12 items-center justify-center p-4 md:w-2/4 min-w-80 lg:h-[450px]">
          
          {product&&<Image alt="Product Image" 
          src={`${product.image}`}
          width={350}
          height={350}
          className="h-full w-full rounded-md object-cover"
          />}
          {!product&&<Image alt="Product Image" 
          src={"data:image/png;base64,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KQIECLQJCN42ShURIECgJiB4a05KESBAoE1A8LZRqogAAQI1AcFbc1KKAAECbQKCt41SRQQIEKgJCN6ak1IECBBoExC8bZQqIkCAQE1A8NaclCJAgECbgOBto1QRAQIEagKCt+akFAECBNoEBG8bpYoIECBQExC8NSelCBAg0CYgeNsoVUSAAIGagOCtOSlFgACBNgHB20apIgIECNQEBG/NSSkCBAi0CQjeNkoVESBAoCYgeGtOShEgQKBNQPC2UaqIAAECNQHBW3NSigABAm0CgreNUkUECBCoCQjempNSBAgQaBMQvG2UKiJAgEBNQPDWnJQiQIBAm4DgbaNUEQECBGoCgrfmpBQBAgTaBARvG6WKCBAgUBMQvDUnpQgQINAmIHjbKFVEgACBmoDgrTkpRYAAgTYBwdtGqSICBAjUBARvzUkpAgQItAkI3jZKFREgQKAmIHhrTkoRIECgTUDwtlGqiAABAjUBwVtzUooAAQJtAoK3jVJFBAgQqAkI3pqTUgQIEGgTELxtlCoiQIBATUDw1pyUIkCAQJuA4G2jVBEBAgRqAoK35qQUAQIE2gQEbxuliggQIFATELw1J6UIECDQJiB42yhVRIAAgZqA4K05KUWAAIE2AcHbRqkiAgQI1AQEb81JKQIECLQJCN42ShURIECgJiB4a05KESBAoE1A8LZRqogAAQI1AcFbc1KKAAECbQKCt41SRQQIEKgJCN6ak1IECBBoExC8bZQqIkCAQE1A8NaclCJAgECbgOBto1QRAQIEagKCt+akFAECBNoEBG8bpYoIECBQExC8NSelCBAg0CYgeNsoVUSAAIGagOCtOSlFgACBNgHB20apIgIECNQEBG/NSSkCBAi0CQjeNkoVESBAoCYgeGtOShEgQKBNQPC2UaqIAAECNQHBW3NSigABAm0CgreNUkUECBCoCQjempNSBAgQaBMQvG2UKiJAgEBNQPDWnJQiQIBAm4DgbaNUEQECBGoCgrfmpBQBAgTaBARvG6WKCBAgUBMQvDUnpQgQINAmIHjbKFVEgACBmoDgrTkpRYAAgTYBwdtGqSICBAjUBARvzUkpAgQItAkI3jZKFREgQKAmIHhrTkoRIECgTUDwtlGqiAABAjUBwVtzUooAAQJtAoK3jVJFBAgQqAkI3pqTUgQIEGgTELxtlCoiQIBATUDw1pyUIkCAQJuA4G2jVBEBAgRqAoK35qQUAQIE2gQEbxuliggQIFATELw1J6UIECDQJiB42yhVRIAAgZqA4K05KUWAAIE2AcHbRqkiAgQI1AQEb81JKQIECLQJCN42ShURIECgJiB4a05KESBAoE1A8LZRqogAAQI1AcFbc1KKAAECbQKCt41SRQQIEKgJCN6ak1IECBBoExC8bZQqIkCAQE1A8NaclCJAgECbgOBto1QRAQIEagKCt+akFAECBNoEBG8bpYoIECBQExC8NSelCBAg0CYgeNsoVUSAAIGagOCtOSlFgACBNgHB20apIgIECNQE/gNyreeLWyOnSgAAAABJRU5ErkJggg=="}
          width={350}
          height={350}
          className="h-full w-full rounded-md object-cover"
          />}
        </div>
        
        <div className="flex flex-col gap-2 p-4 w-9/12 md:w-2/4 ">
          <h1 className="text-3xl font-medium">{product?product.name:"Product Name"}</h1>
          <p className="text-sm">
            {product?product.stock:1 >= 1 ? (
              <span className="block font-semibold text-green-700">
                In Stock
              </span>
            ) : (
              <span className="block font-semibold text-red-700">
                Out of Stock
              </span>
            )}
            {product&&<Link href={""} className="text-blue-700 hover:underline hover:underline-offset-2">
              {product.sellerAccountId}
            </Link>}
          </p>

          {/* rating */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-center ">{product?product.stars:0}</span>
            <ReactStars
              count={5}
              value={product?product.stars:0}
              onChange={ratingChanged}
              size={20}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>
          <hr className="border-slate-300" />

          
          <div className="my-2">
            <p>Category: {product&&<span className="rounded-xl border border-gray-300 p-2 text-gray-500">{product.category}</span>}</p>
            <p className="text-2xl my-2">&#8377;{product?product.price:0}</p>
          </div>

          <div className="mt-4 flex justify-between gap-2">
            <div className="flex">
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleIncrement}
                disabled={count==6}
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
                disabled={count===1}
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

          <div  ref={containerRef}>
            <Accordion type="multiple" className="">
              <AccordionItem value="projectDescription">
                <AccordionTrigger>About this Product</AccordionTrigger>
                <AccordionContent>
                  {product?product.description:""}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
        </div>
      </div>
    </div>
  );
}
