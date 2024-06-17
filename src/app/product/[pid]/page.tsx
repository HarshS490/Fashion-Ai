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

// const dummyProduct : Product = {
//     id: "abc",
//     name: "Sneakers",
//     price: 4000,
//     description:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium cupiditate aspernatur voluptatibus earum facilis saepe inventore in suscipit architecto fugiat, atque reiciendis facere recusandae dolor quia fuga aliquid? Pariatur, itaque tempore? Labore hic numquam repudiandae aliquam cumque veniam quasi repellendus, ea enim? Consequuntur porro excepturi velit. Odit assumenda tenetur molestiae? Inventore recusandae repudiandae totam laboriosam ipsam aut repellat voluptate rerum doloribus cupiditate suscipit eligendi ad placeat pariatur minus doloremque ullam at deserunt impedit, harum, facilis quia. Doloremque ipsum minus cumque accusantium eos? Architecto id sequi animi cupiditate cumque incidunt quis voluptatem nisi molestias veritatis, cum repellendus, corporis, recusandae consequatur quia vero voluptatibus harum nemo alias aliquam impedit deserunt nostrum dolore. Ratione consectetur incidunt doloribus eveniet tempora voluptatum eligendi dolorem accusantium sequi laborum quisquam placeat, ea possimus illo excepturi enim quod asperiores odit eum voluptatibus natus hic ex rem? Explicabo, molestiae vel beatae ratione reprehenderit placeat ipsa cupiditate est pariatur, ipsam impedit quod numquam eum debitis in qui error repellendus earum dolor fuga nemo nulla necessitatibus! Illo sapiente totam explicabo quas pariatur ipsam quam sed eum minus sit, ea adipisci eligendi, assumenda soluta dolorem odio, repellat laudantium vel quos asperiores voluptas atque tempora consequuntur! Vero praesentium molestias facilis velit ratione odit fugiat assumenda quasi aliquid libero nostrum, dolor id quod voluptatum? Libero maxime aspernatur neque sed expedita eaque impedit voluptate quisquam tempore exercitationem recusandae, necessitatibus harum sequi error quod quam amet. Assumenda laudantium molestiae earum ex nam ut ea perspiciatis fugit vel aspernatur id ratione inventore velit magnam adipisci numquam alias autem quas, reprehenderit rerum molestias nostrum sunt. Quam corporis amet ea nostrum neque vel, exercitationem at pariatur in expedita debitis quasi vitae sapiente nulla, quidem repellendus quo! Distinctio rerum temporibus labore quisquam autem ipsa vitae, quia earum beatae id necessitatibus. Libero, molestiae! Vero tempora non consequuntur ullam natus suscipit nam reiciendis eligendi illo in quod est porro laudantium eaque fugit, tenetur pariatur expedita nobis mollitia provident autem? Distinctio autem fugiat ducimus doloremque. Ratione eaque amet sed officia autem dolorum inventore temporibus architecto illum aspernatur assumenda explicabo eos odio omnis, maiores quos facere enim. Quam, aperiam! Nisi cumque repellat incidunt voluptates voluptatum excepturi beatae molestiae quis consequatur amet, dolorem, error vitae, similique quod. Facilis est obcaecati iste suscipit assumenda consequatur cupiditate id tenetur ducimus iusto odio quidem, sit ipsam molestiae aliquid ut? Explicabo dolorum incidunt, nostrum numquam animi soluta dolor. Dolorem temporibus vero minima. Illo ratione odit voluptate illum soluta qui?",
//     category: 'Shoes',
//     image : "data:image/jpeg;base64,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",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     stock: 20,
//     sellerAccountId: "hello i am the seller",
//     stars: 5

// }