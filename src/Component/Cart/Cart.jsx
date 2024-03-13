import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import {  toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { cartContext } from '../../Context/CartContextProvider';
import { Helmet } from 'react-helmet';


export default function Cart() {

  const [cart,setCart]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [timeOutId,setTimeOutId]=useState();
  const [cartId,setCartId]=useState()
  const {setCart:contextCart}=useContext(cartContext)
  

 async function getLoggedUserCart(){
    setIsLoading(true)
   const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token: localStorage.getItem('token')
    }
   })
   contextCart(data)
   setIsLoading(false)
   setCartId(data.data._id)
   setCart(data);
   console.log(cart);
   
 }
 useEffect(()=>{
  getLoggedUserCart();
 },[]);

  function removeProductFromCart(productId){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
        headers:{
            token: localStorage.getItem('token')
        }
      });
      contextCart(data)
      toast.success('Product deleted from your cart',{
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
    
       });
    
      console.log(data);
      setCart(data)
    
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary product is safe :)",
        icon: "error"
      });
    }
  });


 
 }


 async function clearCart(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const {data}=await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
          headers:{
              token: localStorage.getItem('token')
          }
        });
        contextCart(data)
        toast.success('Your cart now is empty',{
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
      
         });
        console.log(data);
        setCart(data)
       } catch (error) {
        console.log(error);
       }
      
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary Product is safe :)",
        icon: "error"
      });
    }
  });


 } 


   function updateProductCount(productId,count){
    clearInterval(timeOutId)
    
 setTimeOutId(setTimeout(async ()=>{
  if (count < 1 ){
    removeProductFromCart(productId)
   }else{
    console.log('hiiiiiiiiiii');
      const {data}= await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
      count
    },{
      headers:{
        token: localStorage.getItem('token') 
      }
    })
    console.log(data);
    setCart(data)
   }
 },500)
)
 }


  return (  <>
    <Helmet>
      <title>Fresh Cart | Cart</title>
    </Helmet>
    { isLoading ?
    <>
    <div className=' d-flex justify-content-center align-items-center m-5 p-5'>
      <i className='fas fa-spinner fa-spin fa-2x'></i>
    </div>
    </>

    :

   <>
    { cart.data?.products.length >0 ?
      <div className='my-5 pt-5'>
    
      <button onClick={clearCart} className='btn btn-outline-danger ms-auto d-block mt-2'>Clear Cart</button>
    
     {cart.data?.products.map((cartProduct,index)=>{
       return <CartProduct updateProductCount={updateProductCount} key={index} cartProduct={cartProduct} removeProductFromCart={removeProductFromCart}/>
     })}
    
    
       <div className='mt-2 d-flex justify-content-between align-items-center '>
         <Link to={'/address/'+ cartId} className='btn bg-main text-white'>Check Out</Link>
         <p>Total Price : {cart.data?.totalCartPrice} GEP</p>
       </div>
    
    
    
      </div>
      :
      <div className='no-product w-75 text-center mx-auto p-3 my-5 fs-1 rounded-4 alert alert-warning '>No Product In Your Cart</div>
    
     }
   
   
   </>

  }

    </>
  
  )
}
