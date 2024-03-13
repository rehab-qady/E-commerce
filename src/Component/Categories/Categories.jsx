import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [allCategories,setAllCategories]=useState();

async function getAllCategories(){
  const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  setAllCategories(data.data);
  console.log(allCategories);

}
useEffect(()=>{
  getAllCategories()
},[])


  return (
    <>
    <Helmet>
      <title>Fresh Cart | Categories</title>
    </Helmet>
     <div className="row " >
     {allCategories?.map((category)=>{
        return  <div className="col-md-4 my-3 " key={category._id}>
          <div className="card category"  >
             <img src={category.image} className="card-img-top w-100" style={{height:300}}   alt=""/>
          <div className="card-body">  
          <h3 className="card-text text-center text-success">{category.name}</h3> 
        </div>
      </div>
        </div>
    })}
    </div>
    </>
  )
}
