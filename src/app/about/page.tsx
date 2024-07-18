import WidthWrapper from "@/components/global/MaxWidthWrapper";
import Navbar from "@/components/global/Navbar";

import { cn } from "@/lib/utils";
import { Satisfy } from "next/font/google";
import Image from "next/image";
import DevCarousel from "./DevCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copyright } from "lucide-react";

const fancy_font = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

const Page = () => {
  const faqs = [
    {
      questionContent: "Can I start buying and selling on this website?",
      answerContent:
        "Not yet, we are working relentlessly to make this idea real, but the website is still in its prototype stage",
    },
    {
      questionContent: "When will the website be available for general use?",
      answerContent:
        "We are working hard in solving all the bugs and adding new features, but it will take time to make everything functional",
    },
    {
      questionContent: "Why is X not working?",
      answerContent:
        "There are multiple bugs and glitches which we still need to fix. If you found an issue, you can raise it in our GitHub",
    },
    {
      questionContent: "The page X is not found / X button does nothing",
      answerContent:
        "A large number of features are yet to be implemented, but we have laid the foundation for them",
    },
    {
      questionContent: "Is it unsafe to sign in to the website just now?",
      answerContent:
        "Although in its initial stage, the account system is managed via OAuth which is completely secure. You need not worry about privacy",
    },
    {
      questionContent: "I uploaded something but now it's no longer visible",
      answerContent:
        "Because the website is still in it's pre-alpha stage, we change database regularly as a result of which your data might get lost",
    },
    {
      questionContent:
        "I found something inappropriate, how should I report it?",
      answerContent:
        "The options to report content has not yet been developed, but you can always contact one of the developers from their contact",
    },
    {
      questionContent: "I also want to contribute",
      answerContent:
        "First of all, thanks for considering our project! We would love to collaborate with you in GitHub. Just ping any one of the developers",
    },
  ];
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
          {/* FAQs */}
          <div>
            <h2 className="mb-5 mt-10 text-center text-5xl font-bold text-zinc-800 md:text-left">
              FAQs
            </h2>
            <Accordion
              type="multiple"
              className="mx-auto mb-2 max-w-prose md:mx-0 md:mt-2"
            >
              {faqs.map(({ questionContent, answerContent }, idx) => (
                <AccordionItem value={`item-${idx}`} key={idx}>
                  <AccordionTrigger className="text-left">
                    {questionContent}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {answerContent}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </WidthWrapper>
      </main>
      <footer className="block bg-zinc-800 py-16 text-zinc-100 lg:py-5">
        <p className="mx-auto flex w-fit items-center justify-center gap-1.5 lg:mr-10">
          <Copyright className="inline-block h-5 w-5" /> All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Page;
