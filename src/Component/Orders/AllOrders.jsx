import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function AllOrders() {

  const [orders,setOrder]=useState();
  const {id}= jwtDecode(localStorage.getItem('token'));
  // console.log(id);

  async function getAllOrders(){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/'+id);
    console.log(data);
    setOrder(data);
    
  }
useEffect(()=>{
  getAllOrders();
},[]);

  return (
   <>
   <Helmet>
  <title>Fresh Cart | AllOrders</title>
</Helmet>
    <h1 className='my-3'>Your Orders:</h1>
    {orders?.map((order)=>{
      return <div key={order.id} className="order shadow my-2 p-3">
        <div className="  d-flex  align-items-center">
          <h2 className='me-3'>#{order.id}</h2>
          <h4 className='ms-2 text-info'>Processing</h4>
        </div>
        <p>You have orderd {order.cartItems.length} items.</p>
        <div>
          {order.cartItems.map((item)=>{
            return <img key={item._id} src={item.product.imageCover} style={{width:150}} alt="" className='mx-2 img-thumbnail' />
          })}
       

          <hr />
        <p className='mt-3 fs-5'> <strong className='fs-5'>Total amount :</strong> {order.totalOrderPrice} EGP</p>
     </div>

    </div>
    })}
   
   </>
  )
}
