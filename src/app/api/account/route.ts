import { db } from "@/lib/db";
import { Account } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const email = req.nextUrl.searchParams.get("email");
  if (!id && !email) {
    return new Response("Sufficient data not provided", { status: 400 });
  }
  let account;
  if (id) {
    account = await db.account.findFirst({
      where: {
        id,
      },
    });
  } else if (email) {
    account = await db.account.findFirst({
      where: {
        email,
      },
    });
  }
  if (!account) {
    return new Response("Account not found", { status: 404 });
  }
  return NextResponse.json(account);
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return new Response("No id provided", { status: 400 });
  }
  const body = (await req.json()) as Account;

  if (!body.email) {
    return new Response("No email available", { status: 400 });
  }

  const account = await db.account.findFirst({
    where: {
      id,
    },
  });

  if (!account) {
    return new Response("Account not found", { status: 404 });
  }

  if (account.email !== body.email) {
    return new Response("Inconsistent data", { status: 400 });
  }

  await db.account.update({
    where: {
      id,
      email: account.email,
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json({ message: "ok" });
}
