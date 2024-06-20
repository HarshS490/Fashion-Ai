"use client";
import React, { useEffect, useState } from "react";
import { getCartData, removeFromCart, updateCartData } from "@/utils/cart";
import { ArrowLeftIcon, ChevronLeft } from "lucide-react";
import { Product } from "@prisma/client";
import CartItemCard from "@/components/cart/CartItemCard";
import Summary from "@/components/cart/Summary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type Props = {};

export type CartProduct = Product & {
  quantity: number;
};

const getProducts = async (cartItems: string[]) => {
  try {
    const res = await fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cartItems }),
    });

    const data = await res.json();
    if (res.ok) {
      return data.products;
    } else {
      console.error("Error from API:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error occured while fetching data", error);
    return [];
  }
};

const Page = ({}: Props) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const deleteFromCart = (id: string) => {
    // remove the item from the cart.
    removeFromCart(id);
    const newState = cartItems.filter((product) => product.id !== id);
    setCartItems(newState);
    console.log("removing item");
  };

  const updateCart = (id: string, qty: number) => {
    updateCartData(id, qty);
    const updatedData = cartItems.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: qty,
        };
      } else {
        return product;
      }
    });
    setCartItems(updatedData);
    console.log("updating data");
  };

  useEffect(() => {
    const data = getCartData();
    if (data) {
      const productList = data.map((item) => item.productId);
      let fetchedData = [];
      const fetchData = async () => {
        const products = await getProducts(productList);
        fetchedData = products.map((product: Product) => {
          let index = productList.findIndex((id) => id === product.id);
          if (index !== -1) {
            return {
              ...product,
              quantity: data[index].quantity,
            };
          }
        });
        setCartItems(fetchedData);
      };
    }
  }, []);
  return (
    <>
      <div className="mx-auto w-full px-2 lg:max-w-5xl">
        <div className="">
          <h1 className="mx-auto mt-5 w-full min-w-max rounded-md bg-gray-100 p-4 text-center font-sans text-4xl font-bold md:p-8 md:text-5xl">
            <span className="tracking-wide">Shopping Cart</span>
            <hr className="mx-auto mt-4 w-1/4 rounded-md border-2 border-black" />
          </h1>

          <div className="my-2 flex items-end text-sm">
            <ChevronLeft size={18}></ChevronLeft>
            <Link
              href={""}
              className="underline underline-offset-4"
              onClick={() => router.back()}
            >
              Back
            </Link>
          </div>
          {cartItems.length == 0 ? (
            <div className="w-full min-w-max flex-col">
              <div>
                <Image
                  src={"/empty-cart.svg"}
                  width={290}
                  alt="empty Cart"
                  height={255}
                  className="mx-auto"
                />
              </div>

              <h1 className="text-center text-3xl font-medium text-gray-600">
                Your cart is empty
              </h1>
              <div className="text-medium my-3 flex justify-center font-medium text-gray-600">
                <Link href={"/explore"}>
                  <Button variant={"outline"} size={"lg"}>
                    <ArrowLeftIcon size={18}></ArrowLeftIcon>
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="gap-2 md:flex md:flex-row">
              <div className="w-full md:w-3/5">
                {cartItems.map((product) => {
                  return (
                    <CartItemCard
                      key={product.id}
                      product={product}
                      deleteFromCart={deleteFromCart}
                      updateCart={updateCart}
                    ></CartItemCard>
                  );
                })}
              </div>
              <div className="w-full md:w-2/5">
                <Summary products={cartItems}></Summary>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
