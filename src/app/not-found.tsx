import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Ghost } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Ghost className="size-20 duration-1000" />
      <p className="mt-5 text-xl text-muted-foreground">Nothing here!</p>
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "lg",
          }),
          "text-md mt-6",
        )}
      >
        <ArrowLeft className="mr-1.5 size-4" />
        Back to home
      </Link>
    </main>
  );
};

export default Page;
