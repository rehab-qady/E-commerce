import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [allBrands,setAllBrands]=useState();
 
  async function getAllBrands(){
    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    setAllBrands(data.data);
  }

  function modal(){
    <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"> 
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="brandTitle text-success">{allBrands.name}
        <p>{allBrands.name}</p>
        </div>
        <div className="brandLogo">{allBrands.image}</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
  }

  useEffect(()=>{
    getAllBrands()
  },[])

  return (
    <>
    <Helmet>
      <title>Fresh Cart | Brands</title>
    </Helmet>
    <h1 className='text-main text-center my-3'>All Brands </h1>
    <div className="row">
      {allBrands?.map((brands)=>{
        return <div className="col-md-3 my-3 " key={brands._id} onClick={()=>{modal(); console.log('hiiiiiii');}}>
        <div className="card category"  >
           <img src={brands.image} className="card-img-top w-100"    alt=""/>
        <div className="card-body">  
        <h2 className="card-text text-center ">{brands.name}</h2> 
      </div>
    </div>
      </div>

      })}
    </div>
    </>
  )
}
