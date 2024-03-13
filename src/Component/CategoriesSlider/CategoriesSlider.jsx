import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategoriesSlider() {

    const [allCategories,setAllCategories]=useState([])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
      };


       async function getCategories(){
        const {data}= await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setAllCategories(data.data);

      }

      useEffect(()=>{
        getCategories()
      },[])


  return (
  <Slider {...settings}>
    {allCategories.map((category, index)=>{
        return <div key={index}>
            <img src={category.image} className='w-100' style={{height:200}} alt="" />
            <h5>{category.name}</h5>
        </div>
    })}
       

    </Slider>
  )
}
