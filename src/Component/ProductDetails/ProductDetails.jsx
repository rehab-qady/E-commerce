import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { cartContext } from '../../Context/CartContextProvider';
import { Helmet } from 'react-helmet';



export default function ProductDetails() {

  const {setCart}= useContext(cartContext)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 
  const {id}= useParams();
  const [productDetails,setProductDetails]=useState({});
  const [isLoading,setIsLoading] = useState(false);
  
  async function getProductDetails(){
    setIsLoading(true);
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products/'+id);
    setIsLoading(false);
    setProductDetails(data.data);
  }


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
 

 useEffect(()=>{
  getProductDetails();
 },[])

  return (
    <>
    <Helmet>
      <title>Fresh Cart | ProductDetails</title>
    </Helmet>
    { isLoading ?
    <>
    <div className=' d-flex justify-content-center align-items-center m-5 p-5'>
      <i className='fas fa-spinner fa-spin fa-2x'></i>
    </div>
    </>
    
    :

    <div className="row align-items-center my-5">
      <div className="col-md-3">
      <Slider {...settings}>
        {productDetails.images?.map((img,index) =>{
          return <img key={index}  src={img} className='w-100' alt="" /> 
        })}

    </Slider>

      </div>
      <div className="col-md-9">
        <h2 className='mt-2'>{productDetails?.title}</h2>
        <h5 className=' mt-2'>{productDetails?.category?.name}</h5>
        <p className='mt-2'>{productDetails.description}</p>
        <p className='d-flex justify-content-between mt-2'>
          <span>{productDetails?.price}  EGP</span>
          <span>
          <i className="star fa-solid fa-star "></i>{productDetails?.ratingsAverage}</span>
        </p>
        <button onClick={()=> addProductToCart(productDetails.id)} className='btn bg-main w-100 mt-2'>+Add To Cart </button>
      </div>
    </div>
  }
    </>
  )
}
