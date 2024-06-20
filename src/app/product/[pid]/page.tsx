"use client";
import ProductDetails from '@/app/product/[pid]/ProductDetails'
import { Product } from '@prisma/client'
import React,{use, useEffect, useState} from 'react'
type Props={
  params:{
    pid:string
  }
}
interface DataProps{
  product:Product
}

export default function Page({params}: Props) {
  
  return (
    <>
        <ProductDetails pid={params.pid}/>
      <div>

        Related Products
      </div>
    </>
  )
}

