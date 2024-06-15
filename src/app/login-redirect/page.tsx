"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Account } from "@prisma/client";
import { Loader2, XCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (!session || !session.user || !session.user.email) {
      return;
    }
    async function getAccount() {
      const response = await fetch(
        `/api/account?email=${session?.user?.email}`,
      );
      if (!response.ok) {
        setError(true);
        return;
      }
      const result = (await response.json()) as Account;
      router.replace(`/login/${result.id}`);
    }
    getAccount();
  }, [session, session?.user, session?.user?.email, router]);
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      {error ? (
        <XCircle className="size-16" />
      ) : (
        <Loader2 className="size-16 animate-spin" />
      )}
      <p
        className={cn(
          "mt-5 text-xl text-muted-foreground",
          error && "text-rose-500",
        )}
      >
        {error ? "Something went wrong" : "Processing..."}
      </p>
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "lg",
          }),
          "text-md mt-6",
        )}
      >
        Please wait while we redirect
      </div>
    </main>
  );
};

export default Page;
