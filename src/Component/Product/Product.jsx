import axios from 'axios'
import React, { useContext, useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { cartContext } from '../../Context/CartContextProvider';


export default function Product({product}) {
  const [addedToWishList,setAddedToWishList]=useState(false);
  const {setCart}=useContext(cartContext)

  async function addProductToCart(productId){
   const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
    productId
   },{
    headers:{
      token: localStorage.getItem('token')
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


  async function addProductToWishList(productId){
    const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
      productId
    },{
      headers:{
        token: localStorage.getItem('token')
      }
    })
    toast.success(data.message,{
      autoClose: 5000,
      closeOnClick: true,
      draggable: true,
  
     });
     setAddedToWishList(true)
    

  }

  useEffect(()=>{
   
  },[])

  
  return (
    <>
    <div  className="product px-2 py-3 overflow-hidden" >
         <Link to={'/productDetails/' + product.id} className='a'>
         <img src={product.imageCover} className='w-100' alt="" />
         <p className='fs-6 name'>{product.category.name}</p>
         <h4 >{product.title.split("").slice(0,15).join('')}</h4>
         <p className='d-flex justify-content-between'>
            <span>{product.price} EGP</span>
            <span>
            <i className="star fa-solid fa-star "></i>
            {product.ratingsAverage}
            </span>
         </p>
         </Link>
        {addedToWishList ?
        <i className="fa-solid fa-heart me-auto fs-3" style={{color:'red'}} onClick={()=>{addProductToWishList(product.id)}}></i>
        :
        <i className="fa-solid fa-heart me-auto fs-3 cursor-pointer mb-2" onClick={()=>{addProductToWishList(product.id)}}></i>
        }
         <button onClick={()=>{ addProductToCart(product.id) }} className='btn bg-main w-100 text-white '>+Add To Cart</button>

    </div>
    </>
  )
}
