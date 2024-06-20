import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
