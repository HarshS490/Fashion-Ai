"use client";
import React,{useState,ChangeEvent} from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {  Trash2,PlusIcon, MinusIcon } from "lucide-react";


type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    stars: number;
    createdAt: Date;
    updatedAt: Date;
    stock: number;
    sellerAccountId: string;
  };
  deleteFromCart: (id: string) => void;
  updateCart: (id: string, qty: number) => void;
};

export default function CartItemCard({
  product,
  deleteFromCart,
  updateCart,
}: Props) {
  const [count,setCount] = useState(1);
	const handleIncrement = ()=>{
    let newCount = count+1;
    updateCart(product.id,newCount);
		setCount(newCount);
	}
	const handleDecrement = ()=>{
    let newCount = count-1;
    updateCart(product.id,newCount);
		setCount(newCount);
	}
	const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
		const inputValue = parseInt(e.target.value);
    if(!isNaN(inputValue)){
      updateCart(product.id,inputValue);
      setCount(inputValue);
    }
	}

  const deleteCartItem = ()=>{
    deleteFromCart(product.id);
  }

  return (
    <div>
      <div className="rounded-md border my-2 flex gap-4 p-2 hover:shadow-md hover:shadow-gray-300">
        <div className="flex w-1/4">
          {
            <Image
              src={
                "data:image/jpeg;base64,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"
              }
              width={200}
              height={250}
              alt="product image"
              className="h-auto w-auto rounded-md"
            />
          }
        </div>
        <div className="my-2 w-3/4 font-sans">
          <div>
            <div className="mb-1 leading-none text-gray-600">
              <div className="flex justify-between">
                <Link href={`product/${product.id}`}>
                  <span className="text-base font-medium">{product.name}</span>
                </Link>
                <span className="text-base font-medium text-black">
                  &#8377;{product.price}
                </span>
              </div>
              {product?.stock >= 1 ? (
                <span className="text-xs font-medium text-green-500">
                  In Stock
                </span>
              ) : (
                <span className="text-xs font-medium text-red-500">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <div>
              <div className="flex w-28 justify-between rounded-md border border-gray-200">
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="h-8 w-8"
                  onClick={handleIncrement}
                  disabled={count >= Math.min(6, (product?product.stock:0))}
                >
                  {<PlusIcon></PlusIcon>}
                </Button>
                <input
                  className="w-8 min-w-8 max-w-min text-center focus:outline-none"
                  onChange={handleChange}
                  value={count}
                />
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="h-8 w-8"
                  onClick={handleDecrement}
                  disabled={count <= 1}
                >
                  {<MinusIcon></MinusIcon>}
                </Button>
              </div>
            </div>
            <div>
              <Button
                variant={"outline"}
                size={"icon"}
                className="h-8 w-8"
                onClick={deleteCartItem}
              >
                <Trash2 className="text-red-600" size={20}></Trash2>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
