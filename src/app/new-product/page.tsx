"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { new_product } from "@/validators/zod-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";

const Page = () => {
  // toggle bar
  const [open, setOpen] = useState<boolean>(false);
  const options = ["Shirt", "TShirt", "Pant", "Shoes"] as const;
  const [value, setValue] = useState<(typeof options)[number] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof new_product>>({
    resolver: zodResolver(new_product),
  });

  const onSubmit = async (data: z.infer<typeof new_product>) => {
    if (!value) {
      toast.error("Please select the product category");
      setOpen(true);
      return;
    }
    const product = {
      name: data.name,
      category: value,
      description: data.description,
      // TODO: Make discount part of db, and also allow percentages
      price: data.sale_price - data.discount,
    };
    console.log(product);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-5 text-zinc-900">
      <h1 className="mx-10 text-xl font-bold tracking-tight">
        Create a New Product
      </h1>
      <main className="flex w-full flex-col-reverse justify-center gap-10 px-5 py-10 md:flex-row">
        {/* Product Information */}
        <div className="flex-[3] rounded-3xl bg-white p-5 shadow-sm md:shadow-xl">
          <h2 className="text-lg font-bold tracking-tight">
            General Information
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex h-full flex-col"
          >
            {/* Product Name and brand */}
            <div className="my-5 flex flex-col gap-5 md:flex-row md:items-center">
              <div className="grow">
                <label className="font-semibold" htmlFor="product-name">
                  Product Name
                </label>
                <Input
                  {...register("name")}
                  className={cn(
                    "mt-1 rounded-lg",
                    errors.name && "bg-rose-100 focus-visible:ring-red-200",
                  )}
                  id="product-name"
                  placeholder="Fashionable TShirt"
                />
              </div>
              <div className="grow">
                {/* TODO: Brand name is not stored in db !? */}
                <label className="font-semibold" htmlFor="brand-name">
                  Brand Name
                </label>
                <Input
                  {...register("brand_name")}
                  className={cn(
                    "mt-1 rounded-lg",
                    errors.brand_name &&
                      "bg-rose-100 focus-visible:ring-red-200",
                  )}
                  id="brand-name"
                  placeholder="Adidas"
                />
              </div>
            </div>
            {/* Product Description */}
            <div>
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Textarea
                {...register("description")}
                className={cn(
                  "my-2 block w-full rounded-lg p-2 text-zinc-700",
                  errors.description &&
                    "bg-rose-100 focus-visible:ring-red-200",
                )}
                rows={5}
              />
            </div>
            {/* Price and discount */}
            <div className="my-5 flex items-center gap-5">
              <div className="grow">
                <label className="font-semibold" htmlFor="product-price">
                  Sale Price
                </label>
                <Input
                  {...register("sale_price")}
                  id="product-price"
                  placeholder="₹100.0"
                  className={cn(
                    errors.sale_price &&
                      "bg-rose-100 focus-visible:ring-red-200",
                  )}
                />
              </div>
              <div className="grow">
                <label className="font-semibold" htmlFor="brand-discount">
                  Discount
                </label>
                <Input
                  id="brand-discount"
                  placeholder="₹0.0"
                  {...register("discount")}
                  className={cn(
                    errors.discount && "bg-rose-100 focus-visible:ring-red-200",
                  )}
                />
              </div>
            </div>

            {/* Separator */}
            <div aria-hidden className="grow"></div>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <Button variant="secondary">Cancel</Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="mt-2 block w-full rounded-xl bg-purple-700 hover:bg-purple-600"
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  Publish
                </Button>
              </div>
            </div>
          </form>
        </div>
        {/* Images */}
        <div className="flex flex-1 flex-row-reverse justify-center gap-10 rounded-3xl bg-white p-5 shadow-sm md:block md:shadow-xl">
          <div>
            <h2 className="font-bold tracking-tight">Product Image</h2>
            {/* TODO: Add upload functionality */}
            <div className="my-5 aspect-square w-full rounded-lg bg-zinc-100 outline-dashed outline-1 outline-zinc-500 md:w-1/3"></div>
          </div>
          <div>
            {/* Product Category */}
            <h2 className="mb-5 font-bold tracking-tight">Product Category</h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value ?? "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          value={option}
                          onSelect={(currentValue) => {
                            // @ts-ignore - The value selected will always be valid
                            setValue(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {option}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Page;
