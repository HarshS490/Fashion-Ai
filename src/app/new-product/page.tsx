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
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronsUpDown,
  ImageUp,
  Plus,
  SquareChevronDown,
  Trash2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { new_product } from "@/validators/zod-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { Account, Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductInput } from "../types/product-types";

const Page = () => {
  // toggle bar
  const [open, setOpen] = useState<boolean>(false);
  const options = ["Shirt", "TShirt", "Pant", "Shoes"] as const;
  // value for product category
  const [productCategory, setProductCategory] = useState<
    (typeof options)[number] | null
  >(null);
  const [image, setImage] = useState<null | File>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [stocks, setStocks] = useState<
    Array<{ size: string; quantity: number }>
  >([]);
  const stockSizeRef = useRef<HTMLInputElement | null>(null);
  const stockQuantityRef = useRef<HTMLInputElement | null>(null);

  function addNewStockDetails() {
    if (!stockSizeRef.current || !stockQuantityRef.current) return;

    const size = stockSizeRef.current.value;
    let quantity = stockQuantityRef.current.value;

    if (!size) {
      toast.error("Invalid Stock Size");
      return;
    }
    if (!quantity) {
      toast.error("No stock quantity provided");
      return;
    }
    if (stocks.find((elem) => elem.size === size)) {
      toast.error("This size stock is already present, remove it first");
      return;
    }
    try {
      z.coerce.number().nonnegative().int().parse(quantity);
    } catch (e) {
      toast.error("Invalid stock quantity!");
      return;
    }
    setStocks([
      ...stocks,
      {
        size,
        quantity: Number(quantity),
      },
    ]);
  }

  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (!session || !session.user || !session.user.email) {
      // this won't happen due to middleware
      return;
    }
    const fetch_account = async () => {
      const response = await fetch(`/api/account?email=${session.user?.email}`);
      if (!response.ok) {
        // the account has logged in but is not in database
        router.push("/login");
      } else {
        const result = (await response.json()) as Account;
        setAccount(result);
      }
    };
    fetch_account();
  }, [router, session]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof new_product>>({
    resolver: zodResolver(new_product),
  });

  const fileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const onSubmit = async (data: z.infer<typeof new_product>) => {
    if (!account) {
      return;
    }
    if (!productCategory) {
      toast.error("Please select the product category");
      setOpen(true);
      return;
    }
    if (!image) {
      toast.error("No image selected!");
      return;
    }
    if (stocks.length === 0) {
      toast.error("Please enter a new stock!");
      return;
    }
    const img_base64 = (await fileToBase64(image)) as string;

    const product: ProductInput = {
      name: data.name,
      category: productCategory,
      description: data.description,
      // TODO: Make discount part of db, and also allow percentages
      price: data.sale_price - data.discount,
      sellerAccountId: account.id,
      image: img_base64,
      stock: stocks,
    };
    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      if (response.status === 400)
        throw new Error("Product name is not unique");
      throw new Error("An error occurred, please try again later");
    }
    const { id } = (await response.json()) as { id: string };
    router.push(`/product/${id}`);
  };

  // dropzone
  const onImageDrop = useCallback(
    (
      acceptedFiles: File[],
      rejectedFiles: Array<{
        errors: Array<{ code: string; message: string }>;
      }>,
    ) => {
      if (rejectedFiles.length !== 0) {
        toast.error(rejectedFiles[0].errors[0].message);
        return;
      }
      if (acceptedFiles.length > 1) {
        toast.error("Only a single image can be uploaded as of now");
        return;
      }
      setImage(acceptedFiles[0]);
    },
    [],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onImageDrop,
    multiple: false,
    onError(err) {
      toast.error("Error in uploading image, please try again later");
    },
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    maxSize: 200_000,
  });

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

            {/* Stock */}
            <div className="flex items-center justify-between gap-5">
              <div className="flex-1">
                <label className="font-semibold" htmlFor="stock-size">
                  Size
                </label>
                <Input id="stock-size" placeholder="XL" ref={stockSizeRef} />
              </div>
              <div className="flex-1">
                <label className="font-semibold" htmlFor="stock-quantity">
                  Quantity
                </label>
                <Input
                  id="stock-quantity"
                  placeholder="100"
                  ref={stockQuantityRef}
                />
              </div>
              <Button
                variant="secondary"
                className="mt-5 block"
                onClick={() => addNewStockDetails()}
              >
                <Plus />
              </Button>
            </div>
            {/* Table to show stocks added */}
            {stocks.length !== 0 && (
              <Table className="mx-auto my-5 max-w-prose border border-zinc-200">
                <TableCaption>Stocks Input</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Size
                    </TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    {/* Buffer header */}
                    <TableHead aria-description="remove"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stocks.map((stock) => (
                    <TableRow key={stock.size}>
                      <TableCell className="text-center font-medium">
                        {stock.size}
                      </TableCell>
                      <TableCell className="text-center">
                        {stock.quantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="px-2 py-1"
                          onClick={() => {
                            setStocks(
                              stocks.filter((ex) => ex.size !== stock.size),
                            );
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell className="text-center">
                      {stocks.reduce(
                        (partial_sum, elem) => partial_sum + elem.quantity,
                        0,
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}

            {/* Separator */}
            <div aria-hidden className="min-h-10 grow"></div>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <Button variant="secondary">Cancel</Button>
              </div>
              <div>
                <Button
                  type="submit"
                  className="mt-2 block w-full rounded-xl bg-purple-700 hover:bg-purple-600"
                  onClick={async () => {
                    toast.promise(handleSubmit(onSubmit)(), {
                      loading: "Uploading new product",
                      error: (err) => err.message,
                      success: "Product uploaded successfully",
                    });
                  }}
                >
                  Publish
                </Button>
              </div>
            </div>
          </form>
        </div>
        {/* Images */}
        <div className="flex-1 justify-center gap-10 rounded-3xl bg-white p-5 shadow-sm md:block md:shadow-xl">
          <div>
            <h2 className="font-bold tracking-tight">Product Image</h2>
            {image ? (
              <div className="relative">
                <div className="relative mb-5 mt-2 aspect-square w-full max-w-52 rounded-lg">
                  <Image
                    alt=""
                    src={URL.createObjectURL(image)}
                    className="rounded-lg object-cover"
                    fill
                  />
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute bottom-1 right-1"
                  onClick={() => setImage(null)}
                >
                  <Trash2 className="size-5" />
                </Button>
              </div>
            ) : (
              <div {...getRootProps()} className="mb-5 mt-2">
                <input {...getInputProps()} multiple={false} />
                {isDragActive ? (
                  <div className="flex aspect-square w-full max-w-52 flex-col items-center justify-center rounded-lg bg-teal-50 outline-dashed outline-2 outline-emerald-400">
                    <SquareChevronDown className="size-10 text-emerald-400" />
                    <p className="mt-2 text-sm text-emerald-400">
                      Release here!
                    </p>
                  </div>
                ) : (
                  <div className="flex aspect-square w-full max-w-52 cursor-pointer flex-col items-center justify-center rounded-lg bg-zinc-50 outline-dashed outline-2 outline-zinc-400 hover:bg-violet-50">
                    <ImageUp className="size-10" />
                    <p className="mt-2 text-sm">Click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      or, drag and drop
                    </p>
                  </div>
                )}
              </div>
            )}
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
                  {productCategory ?? "Select category"}
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
                            setProductCategory(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              productCategory === option
                                ? "opacity-100"
                                : "opacity-0",
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
