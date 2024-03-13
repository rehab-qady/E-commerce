import axios from 'axios';
import React from 'react'
import Product from '../Product/Product';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function Products() {

  function getAllProduct(){
    return  axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const {data}=useQuery('products',getAllProduct,{
    cacheTime:300000,
    refetchInterval:20000,
    staleTime:5000
  })
  // console.log(data);

  return ( <>
  <Helmet>
      <title>Fresh Cart | Products</title>
    </Helmet>
  <div className="row">
  {data?.data.data.map((product)=>{
      return <div className="col-md-3" key={product._id}>
                    <Product product={product}/>
             </div>
  })}
</div>
</>
  )
}
