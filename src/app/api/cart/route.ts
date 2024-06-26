"use server";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:NextRequest
){
    const res = await request.json();
    const {cart }= res.body;
    if(cart){
        try{
            const products = await db.product.findMany({
                where:{
                    id:{
                        in:cart,
                    },
                },
            });
            NextResponse.json({products},{status:200});
        }
        catch(error){
            NextResponse.json({success:false,message:"Error fetching products"},{status:500});
        }
    }else{
        console.error("Cart Not Found");
        NextResponse.json({success:false,message:"Cart Not Found!"},{status:400});
    }

}