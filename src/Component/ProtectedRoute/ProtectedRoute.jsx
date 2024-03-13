import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../Context/AuthContextProvider';
import Login  from '../Login/Login'
// import { Navigate } from 'react-router-dom';



export default function ProtectedRoute({children}) {
    const {userIsLoggedIn } = useContext(authContext);
  return (
      <>
      { userIsLoggedIn ? children : <Login/>}
      {/* { userIsLoggedIn ? children : <Navigate to={'/login'} /> } */}
   
     </>
  )
}
