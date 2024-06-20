import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { CartProduct } from '@/app/cart/page';
import { ShoppingCartIcon } from 'lucide-react';

type Props = {
  products: CartProduct[];
}

export default function Summary({products}: Props) {
  const subtotal = parseFloat(products.reduce((accumulator,product)=>accumulator+(product.price*product.quantity),0).toFixed(2));
  const tax = 0; 
  const shippingCost = 0; 
  
  return (
    <div className='my-2 border p-4 rounded-md  border-gray-300 shadow-md'>
      <h1 className='font-semibold my-2 font-lg'>Summary</h1>
      <div className='flex justify-between mt-3'>
        <span>Subtotal</span>
        <span>&#8377;{subtotal}</span>
      </div>
      <div className='flex justify-between text-sm text-gray-400 my-2'>
        <span>
          Shipping
        </span>
        <span>+&#8377;{shippingCost}</span>
      </div>
      <div className='flex justify-between text-sm text-gray-400 my-2'>
        <span>Tax</span>
        <span>+&#8377;{tax}</span>
      </div>
      <hr className='my-2'></hr>
      <div className='flex justify-between text-lg font-medium'>
        <span>Total</span>
        <span>&#8377;{subtotal+tax+0}</span>
      </div>
      <div className='mt-6'>
        <Link href={'/checkout'}>
          <Button size={'lg'} className='w-full'>
            Check Out
          </Button>
        </Link>
      </div>
    </div>
  )
}