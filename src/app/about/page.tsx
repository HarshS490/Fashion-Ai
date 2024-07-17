import WidthWrapper from "@/components/global/MaxWidthWrapper";
import Navbar from "@/components/global/Navbar";

import { cn } from "@/lib/utils";
import { Satisfy } from "next/font/google";
import Image from "next/image";
import DevCarousel from "./DevCarousel";

const fancy_font = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

const Page = () => {
  return (
    <div>
      <Navbar className="sticky top-0 z-10 bg-white pb-5" />
      <main className="mt-5 flex min-h-screen">
        <WidthWrapper>
          {/* About developers */}
          <div className="my-5 items-center justify-between gap-5 md:flex">
            <div className="flex-[2]">
              <h2 className="text-center text-4xl font-semibold md:text-left md:text-5xl">
                <span className="mr-1.5 inline-block">Meet our team of </span>
                <span className="inline-block">
                  <span
                    className={cn(
                      fancy_font.className,
                      "text-5xl text-violet-500 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)] md:text-6xl",
                    )}
                  >
                    creators
                  </span>
                  ,{" "}
                  <span
                    className={cn(
                      fancy_font.className,
                      "text-5xl text-fuchsia-600 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)] md:text-6xl",
                    )}
                  >
                    designers
                  </span>
                </span>{" "}
                <span className="inline-block">
                  and{" "}
                  <span
                    className={cn(
                      fancy_font.className,
                      "text-5xl text-purple-500 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)] md:text-6xl",
                    )}
                  >
                    problem solvers
                  </span>
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-[80%] text-center text-base text-zinc-700 md:mx-0 md:text-left">
                We are a team of{" "}
                <span className="italic">college students</span> who love
                creating new things. This website is also an attempt to quench
                this <span className="italic">thirst</span>.
              </p>
            </div>
            <div className="hidden flex-1 md:block" aria-hidden="true">
              <Image src="/about-hero.svg" alt="" width={400} height={400} />
            </div>
          </div>
          {/* Carousel of developer profiles */}
          <DevCarousel />
        </WidthWrapper>
      </main>
    </div>
  );
};

export default Page;
