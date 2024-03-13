import React from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../../Context/AuthContextProvider'
import { Helmet } from 'react-helmet'


export default function Register() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading ,setIsLoading]=useState(false);
  const navigate= useNavigate();
  const {userIsLoggedIn,setUserIsLoggedIn}= useContext(authContext)

  const validationSchema = Yup.object({
    name:Yup.string().required('Name is required').min(3,'Min length must be 3 character').max(20,'Max length is 20'),
    email:Yup.string().required('Email is required').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email not valide'),
    password:Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/,'Password at least consist of  one lowercase letter, one digit, one special character and Any character repeated 8 or more times'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'Not matched'),
    phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/ , 'Phone number is invalid')
  })


  const {values , handleSubmit ,handleChange , errors , touched , handleBlur ,isValid} =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    onSubmit:async ()=>{
      setErrorMsg('');
    try {
      console.log('okkkkkkkk');
      // console.log(values);
      setIsLoading(true);
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values);
      if(data.message === 'success'){
        
        setUserIsLoggedIn(true);
        console.log(userIsLoggedIn);
      
        localStorage.setItem('token',data.token);

       if(window.location.pathname === '/login' || window.location.pathname === '/register'  ){
         navigate('/home');
      }else{
         navigate(window.location.pathname)
       }
      }
      console.log(data);
    } catch (error) {
      console.log('Noooooooo');
      setErrorMsg(error.response.data.message);
      console.log(error);

    }
    setIsLoading(false);
    },

    validationSchema,
  });


  return (
    <>
    <Helmet>
      <title>Fresh Cart | Register</title>
    </Helmet>
    <div className='w-75 my-5 m-auto'>
        <h1>Register Now:</h1>
        <form onSubmit={handleSubmit} className=' d-flex flex-column' >
            <label className='mt-2' htmlFor="name">Name:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.name} className='form-control' type="text" id='name' name='name'/>
            {errors.name && touched.name && <p className='alert alert-danger mt-2'>{errors.name}</p>}

            <label className='mt-2' htmlFor="email">Email:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} className='form-control' type="email" id='email' name='email'/>
            {errors.email && touched.email && <p className='alert alert-danger mt-2'>{errors.email}</p>}
            
            <label className='mt-2' htmlFor="password">Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} className='form-control' type="password" id='password' name='password'/>
            {errors.password && touched.password && <p className='alert alert-danger mt-2'>{errors.password}</p>}
             
            <label className='mt-2' htmlFor="rePassword">rePassword:</label>
            <input onBlur={handleBlur} onChange={handleChange}  value={values.rePassword} className='form-control' type="password" id='rePassword' name='rePassword'/>
            {errors.rePassword && touched.rePassword && <p className='alert alert-danger mt-2'>{errors.rePassword}</p>}
             
            <label className='mt-2' htmlFor="phone">Phone:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} className='form-control' type="text" id='phone' name='phone'/>
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
