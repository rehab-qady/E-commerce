import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup'


export default function ForgetPassword() {

  //  const [verifyData, setVerifyData]=useState()
  const [isGetData,setIsGetData]=  useState(false)
  const navigate = useNavigate();


   
  const validationSchema = Yup.object({
        email:Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email not valide'),
       
      }) 

    const {values  , handleChange , handleSubmit ,isValid, errors, touched , handleBlur }=useFormik({
        initialValues:{
            email:'',
        },
        onSubmit: async ()=>{
           setIsGetData(true);
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
              email:values.email,
            })
           setIsGetData(false)

            // setVerifyData(data);
            console.log(data);
            console.log(values.email);

           toast.success(data.message,{
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
        
           });

           if(data.statusMsg === 'success'){
            navigate('/resetCode')
           }
        },
        validationSchema
    })

  return (
    <>
    <Helmet>
      <title>Fresh Cart | ForgetPassword</title>
    </Helmet>
    {isGetData ?
      
      <div className=' d-flex justify-content-center align-items-center m-5 p-5'>
        <i className='fas fa-spinner fa-spin fa-2x'></i>
      </div>

      :

     
   <div className='my-5'>
     <h2>please enter your email to reset your password</h2>
     <form action="" onSubmit={handleSubmit}>
         <input type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur} name='email'  placeholder='Email' className='form-control py-3 my-2' />
         {errors.email && touched.email && <p className='alert alert-danger mt-2'>{errors.email}</p>}
        
          <button disabled={!isValid}  type='submit' className='btn btn-outline-success px-3 py-2 ' >Verify</button>
      
     </form>  
     </div>
      }

      
      </>
  )
}
