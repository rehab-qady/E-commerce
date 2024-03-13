import React, { useContext }  from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { authContext } from '../../Context/AuthContextProvider'
import { Helmet } from 'react-helmet'


export default function Register() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading ,setIsLoading]=useState(false);
  const {setUserIsLoggedIn}=useContext(authContext);
  const navigate = useNavigate();

  

  const validationSchema = Yup.object({
    email:Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email not valide'),
    password:Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,'Password at least consist of  one lowercase letter, one digit, one special character and Any character repeated 8 or more times'),
  })


  const {values , handleSubmit ,handleChange , errors , touched , handleBlur ,isValid} =useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:async ()=>{
      setErrorMsg('');
    try {
      
      setUserIsLoggedIn(true);
      setIsLoading(true);
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
      console.log(data);
      navigate('/home')
      // if(data.message === 'success'){ 
      //   navigate('/home');
      // }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false);
    },

    validationSchema,
  });


  return (
<>
<Helmet>
  <title>Fresh Cart | Login</title>
</Helmet>
<div className='w-75 my-5 m-auto'>
        <h1>Login Now:</h1>
        <form onSubmit={handleSubmit} className=' d-flex flex-column' >

            <label className='mt-2' htmlFor="email">Email:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} className='form-control' type="email" id='email' name='email'/>
            {errors.email && touched.email && <p className='alert alert-danger mt-2'>{errors.email}</p>}
            
            <label className='mt-2' htmlFor="password">Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} className='form-control' type="password" id='password' name='password'/>
            {errors.password && touched.password && <p className='alert alert-danger mt-2'>{errors.password}</p>}
            
            {errorMsg && <p className='alert alert-danger mt-2'>{errorMsg}</p>}
            <Link className='pt-2 fs-5 cursor-pointer text-hover text-decoration-none text-black' to={'/forgetPassword'} >Forget Your Password ?</Link>

            {isLoading ?
            <button disabled type='submit' className='btn bg-success d-block my-2 text-white w-25 ms-auto'><i className="fa-solid fa-spinner fa-spin"></i></button>
            :
            <button disabled={!isValid || isLoading} type='submit' className='btn bg-success d-block my-2 text-white w-25 ms-auto'>Log in</button>
            }
        </form>

    </div>
    </>
  )
}

