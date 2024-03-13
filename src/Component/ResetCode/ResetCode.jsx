import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup'


export default function ResetCode() {
    const navigate=useNavigate();


    const [statusMsg,setStatusMsg]=useState()
    const validationSchema = Yup.object({
        resetCode:Yup.string().required('Code is required').matches(/[0-9]{3,7}$/, 'Code not valide'),
       
      })
    const {values  , handleChange , handleSubmit , isValid , errors, touched , handleBlur }=useFormik({
        initialValues:{
            resetCode:'',
        },
        onSubmit: async ()=>{
            const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
                resetCode:values.resetCode,
            })
            setStatusMsg(data);
           console.log(data);
           console.log('hiiiiiii');

           toast.success(data.message,{
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
           });

           if(data.status === 'Success'){
            navigate('/resetPassword')
           }
        },
        validationSchema
    })
  return (
   <>
   <Helmet>
      <title>Fresh Cart | ResetCode</title>
    </Helmet>
   <div className='my-5'>
   <h1>reset your account password:</h1>
   <form action="" onSubmit={handleSubmit}>
       <input type="text"  value={values.resetCode} onChange={handleChange} onBlur={handleBlur} name='resetCode'  placeholder='code' className='form-control py-3 my-2' />
       {errors.resetCode && touched.resetCode && <p className='alert alert-danger mt-2'>{errors.resetCode}</p>}
       {statusMsg?.statusMsg === 'fail' && <p className='alert alert-danger'>{statusMsg.message}</p> }
       <button disabled={!isValid} type='submit' className='btn btn-outline-success px-3 py-2 ' >Verify</button>
   </form>  
   </div>
   </>
  )
}
