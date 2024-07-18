"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import WidthWrapper from "@/components/global/MaxWidthWrapper";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { Account } from "@prisma/client";

const Navbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (!session || !session.user || !session.user.email) {
      return;
    }
    async function getAccount() {
      const response = await fetch(
        `/api/account?email=${session?.user?.email}`,
      );

      const result = (await response.json()) as Account;
      setAccount(result);
    }
    getAccount();
  }, [session, session?.user, session?.user?.email]);

  const [navOptionsOpen, setNavOptionsOpen] = useState<boolean>(false);
  return (
    <WidthWrapper className={className}>
      <nav className="flex items-center justify-between pt-7">
        <div className="font-bold text-zinc-700">LOGO</div>
        <div className="grow">
          <ul className="fixed bottom-10 left-1/2 z-[20] ml-auto mr-14 flex w-[80vw] min-w-fit -translate-x-1/2 items-center justify-center rounded-xl border border-zinc-300 bg-white py-5 shadow-lg md:w-[50vw] lg:static lg:flex lg:w-fit lg:border-none lg:bg-transparent lg:py-0 lg:shadow-none">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "link" }),
                "block text-sm md:text-base",
                pathname === "/" ? "text-purple-800" : "text-muted-foreground",
              )}
            >
              HOME
            </Link>
            <Link
              href="/explore"
              className={cn(
                buttonVariants({ variant: "link" }),
                "block text-sm md:text-base",
                pathname.includes("/explore")
                  ? "text-purple-800"
                  : "text-muted-foreground",
              )}
            >
              EXPLORE
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "link" }),
                "block text-sm md:text-base",
                pathname.includes("/contact")
                  ? "text-purple-800"
                  : "text-muted-foreground",
              )}
            >
              CONTACT
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "link" }),
                "block text-sm md:text-base",
                pathname.includes("/about")
                  ? "text-purple-800"
                  : "text-muted-foreground",
              )}
            >
              ABOUT
            </Link>
          </ul>
        </div>
        {status === "authenticated" ? (
          <div className="relative">
            <button
              className="relative size-12 cursor-pointer rounded-full ring-2 ring-purple-700 ring-offset-2"
              onClick={() => setNavOptionsOpen(!navOptionsOpen)}
            >
              <Image
                src={session.user?.image ?? ""}
                alt="User profile"
                fill
                className="rounded-full"
              />
            </button>

            <div
              className={cn(
                "absolute right-2 top-14 z-10 w-[30vw] min-w-fit max-w-[40vw] rounded-lg bg-[rgba(228,228,231,0.6)] px-5 py-2 backdrop-blur-lg transition-all",
                navOptionsOpen
                  ? "opacity-100"
                  : "pointer-events-none -translate-y-3 opacity-0",
              )}
            >
              <ul>
                <li className="truncate text-xl font-bold tracking-tight">
                  {account ? (
                    <Link
                      href={`/account/${account.id}`}
                      className="hover:underline"
                    >
                      <span className="block">{session.user?.name}</span>
                      <span className="block text-xs font-light text-muted-foreground">
                        {session.user?.email}
                      </span>
                    </Link>
                  ) : (
                    <div className="text-muted-foreground">
                      <span className="block">{session.user?.name}</span>
                      <span className="block text-xs font-light text-muted-foreground">
                        {session.user?.email}
                        <Loader2 className="ml-1.5 inline-block size-5 animate-spin" />
                      </span>
                    </div>
                  )}
                </li>
                <li className="mt-5">
                  <Button
                    className="ml-auto block w-fit"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-1.5 inline-block size-5" />
                    Sign Out
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        ) : status === "loading" ? (
          <div className="flex items-center gap-5">
            <Button variant="ghost" className="rounded-3xl" disabled>
              LOG IN
            </Button>
            <Button
              disabled
              className="flex items-center rounded-3xl bg-purple-700 hover:bg-purple-600"
            >
              <Loader2 className="size-5 animate-spin" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-3xl",
              )}
              href="/login"
            >
              LOG IN
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex items-center rounded-3xl bg-purple-700 hover:bg-purple-600",
              )}
            >
              SIGN UP
            </Link>
          </div>
        )}
      </nav>
    </WidthWrapper>
  );
};

export default Navbar;
