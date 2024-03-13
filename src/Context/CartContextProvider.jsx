import axios from 'axios';

import React, { createContext, useEffect, useState } from 'react'


export const cartContext=createContext();

export default function CartContextProvider({children}) {
 const [cart , setCart]=useState({})
 

 async function getLoggedUserCart(){
    
   const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token: localStorage.getItem('token')
    }})
 console.log(data);
   setCart(data);
   
 }
 useEffect(()=>{
  getLoggedUserCart();
 },[]);


  return (
   <cartContext.Provider value={{cart,setCart}}>
    {children}
   </cartContext.Provider>
  )
}
