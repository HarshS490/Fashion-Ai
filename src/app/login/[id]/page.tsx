"use client";

import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [open, setOpen] = useState<boolean>(false);
  const options = ["Buyer", "Seller"] as const;
  const [value, setValue] = useState<(typeof options)[number]>("Buyer");
  return (
    <main className="flex h-screen w-full items-center justify-center sm:bg-blue-100">
      <div className="flex h-full w-full items-center gap-7 rounded-xl p-12 sm:h-3/4 sm:w-3/4 sm:items-start sm:bg-white">
        <div className="-mt-4 flex h-full w-1/3 min-w-64 flex-1 flex-col gap-3">
          <h1 className="text-center text-6xl tracking-tighter">
            Almost there
          </h1>
          <div className="-mt-10 flex grow flex-col justify-center gap-3">
            <div className="mt-2 flex flex-col gap-3 text-center text-lg">
              Select your account type
            </div>
            {/* Combobox */}
            <div className="mx-auto w-fit">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {options.find((option) => option === value)}
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
                              if (
                                currentValue === "Buyer" ||
                                currentValue === "Seller"
                              ) {
                                setValue(currentValue);
                                setOpen(false);
                              }
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
          <Button className="mx-auto mt-2 block w-3/4 rounded-3xl bg-purple-700 hover:bg-purple-600">
            Continue
          </Button>
        </div>
        <div
          className="relative hidden h-full w-full flex-1 md:block"
          aria-hidden
        >
          <Image
            src="/login-page.jpg"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
