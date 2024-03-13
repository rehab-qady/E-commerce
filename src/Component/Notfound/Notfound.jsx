import React from 'react'
import imgError from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return (
   <div className='text-center my-5'>
    <Helmet>
  <title>Fresh Cart | NotFound</title>
</Helmet>
     <img src={imgError} w-100  alt="" />
   </div>
  )
}
