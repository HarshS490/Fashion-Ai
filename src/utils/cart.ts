type cartItem = {
    productId:string,
    quantity: number,
}

const removeFromCart=(id:string)=>{
    if(typeof window!=='undefined'){
        const data = localStorage.getItem("Cart"); 
        const cartItems = data? JSON.parse(data):[];
        const updatedData = cartItems.map((item:cartItem)=>{
            if(item.productId!==id){
                return item;
            }
        });

        localStorage.setItem("Cart",JSON.stringify(updatedData));
    }
    else{
        console.error('Local Storage is not available.');
        
    }
}

const addToCart = (id:string,qty:number)=>{ 
    if(id){
        if(typeof window!=='undefined'){
            const item:cartItem = {
                productId: id,
                quantity: qty,
            }
            const data = localStorage.getItem("Cart"); 
            const cartItems:cartItem[] = data? JSON.parse(data):[];
            cartItems.push(item);
            localStorage.setItem("Cart",JSON.stringify(cartItems));
        }
        else{
            console.error("Local Storage is not available.");
        }
    }
    else{
        console.error("product id should not be undefined");
    }
}

const getCartData= ():cartItem[]|null=>{
    if(typeof window!=='undefined'){
        const data = localStorage.getItem("Cart");
        const cartItems:cartItem[] = data?JSON.parse(data):[];
        return cartItems;
    }
    else{
        console.error("LocalStorage not available.");
        return null;
    }
}

const updateCartData = (id:string,qty:number)=>{
    if(typeof window!=='undefined'){
        const data = localStorage.getItem("Cart");
        const cartItems:cartItem[] = data?JSON.parse(data):[];
        const updateData = cartItems.map((product)=>{
            if(product.productId===id){
                return {
                    productId:id,
                    quantity:qty
                }
            }
            else{
                return product;
            }
        })
    }
    else{
        console.error("LocalStorage not available.");
    }
}


export {removeFromCart,addToCart,getCartData,updateCartData,type cartItem}
