"use server";

import CategorySelector from "@/components/account/CategorySelector";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
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
    return <main>{account.username} Buyer</main>;
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
