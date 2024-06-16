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
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CategorySelector = ({ id, email }: { id: string; email: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const options = ["Buyer", "Seller"] as const;
  const [value, setValue] = useState<(typeof options)[number]>("Buyer");
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-5">
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
      <Button
        onClick={async () => {
          try {
            const response = await fetch(`/api/account?id=${id}`, {
              method: "PUT",
              body: JSON.stringify({
                email,
                category: value,
              }),
            });
            if (!response.ok) {
              throw new Error("Error occurred");
            }
          } catch (e) {
            toast.error(
              "Unable to update your account, please try again later",
            );
          } finally {
            router.refresh();
          }
        }}
      >
        Continue
      </Button>
    </div>
  );
};

export default CategorySelector;
