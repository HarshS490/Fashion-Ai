"use server";

import CategorySelector from "@/components/account/CategorySelector";
import WidthWrapper from "@/components/global/MaxWidthWrapper";
import { db } from "@/lib/db";
import { Bolt, HandCoins, ShoppingCart, UserRoundCog } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return notFound();
  const account = await db.account.findFirst({
    where: {
      id,
    },
  });

  if (!account) {
    return notFound();
  }
  if (account.category === "Buyer") {
    return (
      <main>
        <WidthWrapper className="min-h-screen pt-10">
          <div className="flex flex-col items-center md:min-h-fit md:flex-row">
            <div className="flex flex-col items-center md:flex-[1.5]">
              {/* Profile Pic */}
              <div className="relative size-40 rounded-full bg-gray-300 ring-4 ring-purple-400 ring-offset-2">
                {account.profilePic && (
                  <Image
                    src={account.profilePic}
                    fill
                    alt="Profile Picture"
                    className="pointer-events-none rounded-full"
                  />
                )}
              </div>
              <div className="text-center">
                <h1 className="mt-4 text-5xl tracking-tighter text-zinc-900">
                  {account.username}
                </h1>
                <p className="mt-1 text-muted-foreground">{account.email}</p>
              </div>
              {account.phoneNumber && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Phone: {account.phoneNumber}
                </p>
              )}
            </div>
            {/* Options */}
            <div className="mt-5 flex w-full items-center justify-between gap-5 md:grid md:flex-1 md:grid-cols-2 md:grid-rows-2 md:px-10">
              <Link
                href="/cart"
                className="flex aspect-square w-1/5 flex-col items-center justify-center gap-1.5 rounded-lg bg-zinc-50 outline outline-zinc-100 transition hover:bg-zinc-100 hover:outline-none md:aspect-video md:w-full"
              >
                <ShoppingCart className="size-7 text-zinc-600 md:size-10" />
                <p className="text-sm text-muted-foreground md:text-lg">cart</p>
              </Link>
              <Link
                href={`/account/${id}/edit`}
                className="flex aspect-square w-1/5 flex-col items-center justify-center gap-1.5 rounded-lg bg-zinc-50 outline outline-zinc-100 transition hover:bg-zinc-100 hover:outline-none md:aspect-video md:w-full"
              >
                <UserRoundCog className="size-7 text-zinc-600 md:size-10" />
                <p className="text-sm text-muted-foreground md:text-lg">
                  account
                </p>
              </Link>
              <Link
                href={`/payments/${id}`}
                className="flex aspect-square w-1/5 flex-col items-center justify-center gap-1.5 rounded-lg bg-zinc-50 outline outline-zinc-100 transition hover:bg-zinc-100 hover:outline-none md:aspect-video md:w-full"
              >
                <HandCoins className="size-7 text-zinc-600 md:size-10" />
                <p className="text-sm text-muted-foreground md:text-lg">
                  payment
                </p>
              </Link>
              <Link
                href="/settings"
                className="flex aspect-square w-1/5 flex-col items-center justify-center gap-1.5 rounded-lg bg-zinc-50 outline outline-zinc-100 transition hover:bg-zinc-100 hover:outline-none md:aspect-video md:w-full"
              >
                <Bolt className="size-7 text-zinc-600 md:size-10" />
                <p className="text-sm text-muted-foreground md:text-lg">
                  settings
                </p>
              </Link>
            </div>
          </div>
          {/* Separator in larger screens */}
          <div
            aria-hidden
            className="mx-auto my-10 hidden h-[2px] w-3/4 rounded-lg bg-purple-200 md:block"
          ></div>
          <div>
            <h2 className="mt-10 text-3xl tracking-tight">
              Recommended Offers
            </h2>
            <div>{/* Add recommended products here */}</div>
          </div>
        </WidthWrapper>
      </main>
    );
  } else if (account.category === "Seller") {
    return <main>{account.username} Seller</main>;
  } else {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) return notFound();
    const sessionAccount = await db.account.findFirst({
      where: {
        email: session.user.email,
      },
    });
    if (!sessionAccount) return notFound();
    if (id !== sessionAccount.id) {
      return notFound();
    }
    return (
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="mb-7 max-w-prose text-center text-xl">
          Please select your account category to continue
        </h1>
        <CategorySelector id={id} email={session.user.email} />
      </main>
    );
  }
};

export default Page;
