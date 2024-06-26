import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ProductInput } from "@/app/types/product-types";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("pid");
  if (!productId) {
    return new Response("Missing information", { status: 400 });
  }
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        stock: true,
      }
    });
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching data" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const product = (await request.json()) as ProductInput;
  let id;
  try {
    const { id: newId } = await db.product.create({
      data: {
        category: product.category,
        image: product.image,
        name: product.name,
        price: product.price,
        description: product.description,
        stock: {
          createMany: {
            data: product.stock.map((stock) => ({
              size: stock.size,
              amount: stock.quantity,
            })),
          },
        },
        sellerAccountId: product.sellerAccountId,
      },
    });
    id = newId;
  } catch (e: any) {
    if (e.code === "P2002") {
      // unique name constraint failed
      return NextResponse.json(
        { message: "Unique constraint violated" },
        { status: 400 },
      );
    } else {
      return NextResponse.json({ message: e }, { status: 500 });
    }
  }
  return NextResponse.json({ id }, { status: 200 });
}
