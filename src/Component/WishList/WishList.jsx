import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { cartContext } from '../../Context/CartContextProvider';
import { Helmet } from 'react-helmet';



export default function WishList() {
  const [wishList,setWishList]=useState()
  const {setCart}=useContext(cartContext)


  async function getLoggedUserWishList(){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(data);
    setWishList(data.data)
  }

  async function removeWishList(productId){
    const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,{
       headers:{
        token:localStorage.getIte('token')
       }
    })
    console.log(data);
    setWishList(data.data)
    getLoggedUserWishList()
    console.log(wishList);
  }

  async function addProductToCart(productId){
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
     productId
    },{
     headers:{
       token: localStorage.getIte('token')
     }
    })
    setCart(data)
    toast.success(data.message,{
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
  
     });
    
    console.log(data);
 
   }

  useEffect(()=>{
   getLoggedUserWishList()
   console.log(localStorage.getItem('token'));
  },[])
    
  return (
    <>
    <Helmet>
      <title>Fresh Cart | WishList</title>
    </Helmet>
    <div className="wishlist my-5 p-5">
      <h1 className='my-5'>My Wish List</h1>
      {wishList?.map((wishItem)=>{
        return <div className="item" key={wishItem.id}>
          <div className="productWished d-flex justify-content-between align-items-center">
            <div className="details  d-flex align-items-center">
            <img src={wishItem.imageCover} style={{width:150}} alt="" />
            <div className="title ps-3">
              <h3>{wishItem.title}</h3>
              <p className='text-success fw-bold'>{wishItem.price} EGP</p>
             <button style={{color:'red'}} className='btn ps-0' onClick={()=>{removeWishList(wishItem.id)}}><i className="fa-solid fa-trash"></i> Remove</button>
            </div>
            </div>

            <div className="cart">
              <button className='bg-transparent rounded-3 border-main px-3 py-2 fs-5' onClick={()=>{addProductToCart(wishItem.id)}}>add To cart</button>
            </div>

          </div>
          <hr />
        </div>
      })}
    </div>
    
    </>
  )
}
