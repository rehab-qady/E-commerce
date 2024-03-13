import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContextProvider';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";



export default function Address() {

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading ,setIsLoading]=useState(false);
  // const {userIsLoggedIn,setUserIsLoggedIn}= useContext(authContext)
  const {cartId}=useParams();


    const validationSchema=Yup.object({
        details:Yup.string().required('Please enter details of your address'),
        city:Yup.string().required('Please enter your city'),
        phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/ , 'Phone number is invalid')
    })


 const {values , handleSubmit ,handleChange , errors , touched , handleBlur ,isValid}=useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:''
    },
    onSubmit:async ()=>{
        setErrorMsg('');
      try {
        console.log('okkkkkkkk');
       
        setIsLoading(true);
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
            shippingAddress: values
        },{
            headers:{
                token: localStorage.getItem('token')
            },
            params:{
                url:'http://localhost:3000'
            }
        }); 
        console.log(data);
        window.open(data.session.url,"_self")
      } catch (error) {
        console.log('Noooooooo');
        // setErrorMsg(error.response.data.message);
        console.log(error);
  
      }
      setIsLoading(false);
      },

    validationSchema,
 })



  return (
   
    <>
    <Helmet>
      <title>Fresh Cart | Address</title>
    </Helmet>
    <div className='w-75 m-auto my-5'>
    <h1 className='mt-5'>Address:</h1>
    <form onSubmit={handleSubmit} >
        <label htmlFor="details">Details:</label>
        <input className='form-control mt-3 ' value={values.details} onChange={handleChange} onBlur={handleBlur} type="text" placeholder='Address Details' id='details' />
        {errors.details && touched.details && <p className='alert alert-danger mt-2'>{errors.details}</p>}

        <label className='mt-2' htmlFor="city">City:</label>
        <input className='form-control mt-3 ' value={values.city} onChange={handleChange} onBlur={handleBlur}  type="text" placeholder='Enter your city' id='city'/>
        {errors.city && touched.city && <p className='alert alert-danger mt-2'>{errors.city}</p>}

        <label className='mt-2'  htmlFor="phone">Phone:</label>
        <input className='form-control mt-3 ' value={values.phone} onChange={handleChange} onBlur={handleBlur}  type="text" placeholder='enter your phone' id='phone' />
        {errors.phone && touched.phone && <p className='alert alert-danger mt-2'>{errors.phone}</p>}


         
        {errorMsg && <p className='alert alert-danger mt-2'>{errorMsg}</p>}

{isLoading ?
<button disabled type='submit' className='btn bg-success d-block my-2 text-white w-25 ms-auto'><i className="fa-solid fa-spinner fa-spin"></i></button>
:
<button disabled={!isValid || isLoading} type='submit' className='btn bg-success d-block my-2 text-white w-25 ms-auto'>Register</button>
}
    </form>
    
    
    </div>
    </>

    
  )
}
