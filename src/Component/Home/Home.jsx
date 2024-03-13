import axios  from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import Slider from "react-slick";
import img1 from '../../Assets/images/grocery-banner-2.jpeg'
import img2 from '../../Assets/images/grocery-banner.png'
import img3 from '../../Assets/images/slider-image-1.jpeg'
import img4 from '../../Assets/images/slider-2.jpeg'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { Helmet } from 'react-helmet';
// import { useQuery } from 'react-query';


export default function Home() {
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
 

  const [products, setProducts]=useState([]);
  const [isGetData,setIsGetData]=  useState(false)


  async function getAllProduct(){
    setIsGetData(true)
    const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    setIsGetData(false)
    setProducts(data.data);
    console.log(data.data);
  }

  useEffect(()=>{
    getAllProduct();
 },[])

  return (
    <>
     <Helmet>
      <title>Fresh Cart | Home</title>
    </Helmet>
    {
      isGetData?
      
    <div className=' d-flex justify-content-center align-items-center m-5 p-5'>
      <i className='fas fa-spinner fa-spin fa-2x'></i>
    </div>
    
    :

    <>
    
    <header>
   <div className="row g-0 ">

    <div className="col-md-9">
    <Slider {...settings}>
      <img src={img1}  className='w-100' alt="" />
      <img src={img2}  className='w-100' alt="" />
    </Slider>
    </div>

    <div className="col-md-3">
      <img src={img3} className='w-100' alt="" />
      <img src={img4} className='w-100' alt="" />

    </div>
   </div>
      
    </header>

    <CategoriesSlider/>
 
      <div className="row">
        {products.map((product)=>{
            return <div className="col-md-3" key={product._id}>
                 <Product product={product}/>
                </div>
        })}
      </div>

    </>

    }
   
    </>
  )
}
