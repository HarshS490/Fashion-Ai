"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { login_continue } from "@/validators/zod-validators";
import { Account } from "@prisma/client";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const options = ["Buyer", "Seller"] as const;
  const [value, setValue] = useState<(typeof options)[number]>("Buyer");
  const { data: session } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setUsername,
  } = useForm<z.infer<typeof login_continue>>({
    resolver: zodResolver(login_continue),
  });

  // fetch the user account
  const [account, setAccount] = useState<Account | null>(null);
  const [validAccount, setValidAccount] = useState<boolean>(true);

  useEffect(() => {
    const fetch_account = async () => {
      const response = await fetch(`/api/account?id=${id}`);
      if (!response.ok) {
        setValidAccount(false);
      } else {
        const result = (await response.json()) as Account;
        if (result.category) {
          // the user had once reached here before
          setValidAccount(false);
          return;
        }
        setAccount(result);
        setUsername("username", result.username);
      }
    };
    fetch_account().then(() => setLoading(false));
  }, [id, setUsername]);

  if (!validAccount) {
    router.replace("/login");
    return (
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <p className="mt-5 text-xl text-muted-foreground">Nothing here!</p>

        <p className="text-center">
          You will be redirected soon
          <Loader2 className="mx-auto mt-3 block h-5 w-5 animate-spin" />
        </p>
      </main>
    );
  }

  const onSubmit = async (data: z.infer<typeof login_continue>) => {
    try {
      const response = await fetch(`/api/account?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          email: account?.email,
          username: data.username,
          category: value,
        }),
      });
      if (!response.ok) {
        throw new Error("Error occurred");
      }
    } catch (e) {
      toast.error("Unable to update your account, please try again later");
    } finally {
      router.replace("/explore");
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center sm:bg-blue-100">
      <div className="flex h-full w-full items-center gap-7 rounded-xl p-12 sm:h-3/4 sm:w-3/4 sm:items-start sm:bg-white">
        <form
          className="-mt-4 flex h-full w-1/3 min-w-64 flex-1 flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-center text-6xl tracking-tighter">
            Almost there
          </h1>
          <div className="-mt-10 flex grow flex-col justify-center gap-3">
            <div>
              <label
                htmlFor="username"
                className="cursor-pointer tracking-tight"
              >
                Username
                {loading && (
                  <Loader2 className="ml-1.5 inline-block h-5 w-5 animate-spin" />
                )}
                {errors.username && (
                  <p className="ml-1.5 inline-block text-sm text-rose-600">
                    * user-name must be at-least 3 characters long
                  </p>
                )}
              </label>
              <Input
                disabled={loading || session?.user?.email !== account?.email}
                {...register("username")}
                id="username"
                placeholder="Enter your username"
                className={cn(
                  "mt-1.5",
                  errors.username && "focus-visible:ring-red-600",
                )}
              />

              <div className="mt-2 flex flex-col gap-3">
                Select your account type
              </div>
            </div>
            {/* Combobox */}
            <div>
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
          <Button
            disabled={loading || session?.user?.email !== account?.email}
            className="mx-auto mt-2 block w-3/4 rounded-3xl bg-purple-700 hover:bg-purple-600"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Continue
          </Button>
        </form>
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
