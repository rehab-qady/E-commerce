import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import {  useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContextProvider';
import { Helmet } from 'react-helmet';




export default function ResetCode() {
   const {setUserIsLoggedIn}=useContext(authContext)

    const [statusMsg,setStatusMsg]=useState();
    const navigate=useNavigate();

    const validationSchema = Yup.object({
        email:Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  , 'Email not valide'),
        newPassword:Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,'Password at least consist of  one lowercase letter, one digit, one special character and Any character repeated 8 or more times'),
       
      })
    const {values  , handleChange , handleSubmit  , errors, touched , handleBlur }=useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
        onSubmit: async ()=>{
            const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
                email:values.email,
                newPassword:values.newPassword,
            })
            setStatusMsg(data);
            console.log(data);
           console.log(values);
           console.log('ok');

           toast.success(data.message,{
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
        
           });


           if(data.token){
            localStorage.setItem('token',data.token)
            setUserIsLoggedIn(true);
            navigate('/home')
           }
        },
        validationSchema
    })
  return (
   <>
   <Helmet>
      <title>Fresh Cart | ResetPassword</title>
    </Helmet>
   <div className='my-5'>
   <h1>reset your account password:</h1>
   <form action="" onSubmit={handleSubmit}>
       <input type="email"  value={values.email} onChange={handleChange} onBlur={handleBlur} name='email'  placeholder='email' className='form-control py-3 my-2' />
       {errors.email && touched.email && <p className='alert alert-danger mt-2'>{errors.email}</p>}
       <input type="password"  value={values.newPassword} onChange={handleChange} onBlur={handleBlur} name='newPassword'  placeholder='password' className='form-control py-3 my-2' />
       {errors.newPassword && touched.newPassword && <p className='alert alert-danger mt-2'>{errors.newPassword}</p>}
       {statusMsg?.statusMsg === 'fail' && <p className='alert alert-danger'>{statusMsg.message}</p> }
       <button  type='submit' className='btn btn-outline-success px-3 py-2 ' >Verify</button>
   </form>  
   </div>
   </>
  )
}

