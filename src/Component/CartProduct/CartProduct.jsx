import React, { useState } from 'react'

export default function CartProduct({cartProduct,removeProductFromCart,updateProductCount}) {

const [count,setCount]=useState(cartProduct.count)

  return (<div  className="cart-product">
  <div className="row align-items-center shadow-lg mt-2">
    <div className="col-md-2">
      <img src={cartProduct.product?.imageCover} className='w-100' alt="" />
    </div>
    <div className="col-md-8">
      <h3>{cartProduct.product.title}</h3>
      <h4>{cartProduct.product.category?.name}</h4>
     <p className='d-flex justify-content-between'>
      <span>{cartProduct.price} GEP</span>
      <span> <i className="star fa-solid fa-star "></i> {cartProduct.product.ratingsAverage}</span>
     </p>

     <p> <span className='fw-bold'>Total Price:</span> {cartProduct.price * cartProduct.count} GEP</p>


    </div> 
    <div className="col-md-2 ">
      <button onClick={()=>{ removeProductFromCart(cartProduct.product._id)}} className='btn text-danger '>Remove</button>
      <div className='d-flex align-items-center'>
        <button disabled={count==1} onClick={()=>{updateProductCount(cartProduct.product._id, count -1); setCount(count-1) }} className='btn bg-main text-white'>-</button>
        <span className='px-2'>{count}</span>
        <button onClick={()=>{updateProductCount(cartProduct.product._id, count +1) ; setCount(count+1)}} className='btn bg-main text-white'>+</button>
      </div>
      
    
  </div>   
   </div>
</div>
    
    
  )
}
