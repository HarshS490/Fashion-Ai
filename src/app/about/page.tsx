import WidthWrapper from "@/components/global/MaxWidthWrapper";
import Navbar from "@/components/global/Navbar";
import { cn } from "@/lib/utils";
import { Satisfy } from "next/font/google";
import Image from "next/image";

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
          <div className="my-5 flex items-center justify-between gap-5">
            <div className="flex-[2]">
              <h2 className="text-5xl font-semibold">
                <span className="inline-block">Meet our team of </span>
                <span className="inline-block">
                  <span
                    className={cn(
                      fancy_font.className,
                      "text-6xl text-violet-500 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)]",
                    )}
                  >
                    creators
                  </span>
                  ,{" "}
                  <span
                    className={cn(
                      fancy_font.className,
                      "text-6xl text-fuchsia-600 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)]",
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
                      "text-6xl text-purple-500 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)]",
                    )}
                  >
                    problem solvers
                  </span>
                </span>
              </h2>
              <p className="mt-5 max-w-[80%] text-base text-zinc-700">
                We are a team of{" "}
                <span className="italic">college students</span> who love
                creating new things. This website is also an attempt to quench
                this <span className="italic">thirst</span>.
              </p>
            </div>
            <div className="flex-1" aria-hidden="true">
              <Image src="/about-hero.svg" alt="" width={400} height={400} />
            </div>
          </div>
        </WidthWrapper>
      </main>
    </div>
  );
};

export default Page;
