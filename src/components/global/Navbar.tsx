"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import WidthWrapper from "@/components/global/MaxWidthWrapper";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <WidthWrapper>
      <nav className="flex items-center justify-between pt-7">
        <div className="font-bold text-zinc-700">LOGO</div>
        <div className="grow">
          <ul className="ml-auto mr-14 hidden w-fit items-center md:flex">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-base",
                pathname === "/" ? "text-purple-800" : "text-muted-foreground",
              )}
            >
              HOME
            </Link>
            <Link
              href="/explore"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-base",
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
                "text-base",
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
                "text-base",
                pathname.includes("/about")
                  ? "text-purple-800"
                  : "text-muted-foreground",
              )}
            >
              ABOUT
            </Link>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <Link
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-3xl")}
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
      </nav>
    </WidthWrapper>
  );
};

export default Navbar;
