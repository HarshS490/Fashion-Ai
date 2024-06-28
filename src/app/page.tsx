import WidthWrapper from "@/components/global/MaxWidthWrapper";
import Navbar from "@/components/global/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copyright } from "lucide-react";

import { Satisfy } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const fancy_font = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Navbar />
      <WidthWrapper>
        <main>
          {/* Hero */}
          <div className="mt-32 justify-around gap-10 md:flex">
            <div className="flex-1">
              <h1
                className={cn(
                  "text-center text-7xl tracking-tight md:text-8xl",
                  fancy_font.className,
                )}
              >
                <span className="text-8xl text-purple-500 md:text-9xl">
                  fashion
                </span>
                <br />
                <span className="ml-5">Redefined</span>
              </h1>
              <p className="mx-auto mt-10 max-w-[80%] leading-relaxed tracking-wide text-zinc-700">
                Our curated collection showcases handpicked garments and
                accessories from both renowned designers and emerging talents
                worldwide.
              </p>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mx-auto my-10 flex w-fit items-center rounded-3xl bg-purple-700 px-10 py-7 text-base font-light tracking-widest hover:bg-purple-600 md:ml-10",
                )}
              >
                Read more
              </Link>
            </div>
            <div className="relative -mt-5 h-[60vh] min-h-36 flex-1">
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[rgba(255,255,255,0.45)] to-[rgba(255,255,255,0)]"
              ></div>
              <Image
                src="/fashion-ai-model.jpg"
                fill
                alt=""
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </main>
      </WidthWrapper>
      <footer className="block bg-zinc-800 py-5 text-zinc-100">
        <p className="mx-auto flex w-fit items-center justify-center gap-1.5 lg:mr-10">
          <Copyright className="inline-block h-5 w-5" /> All rights reserved
        </p>
      </footer>
    </div>
  );
}
