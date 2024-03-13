import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContextProvider'
import logo from '../../Assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContextProvider'


export default function Navbar() {
  const {cart}=useContext(cartContext)
  


  const {userIsLoggedIn,setUserIsLoggedIn}=useContext(authContext);
  const navigate= useNavigate();

  function logOut(){
    setUserIsLoggedIn(false);
    localStorage.removeItem('token')
    navigate('/login');
  }


  return ( <nav className="navbar fixed-top  navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <Link className="navbar-brand" to={'home'} >
        <img src={logo} alt="" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        {userIsLoggedIn && 
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         <li className="nav-item">
           <Link className="nav-link " to={'/home'}>Home</Link>
         </li>
         {/* <li className="nav-item">
           <Link className="nav-link" to={'/cart'}>Cart</Link>
         </li>       */}
         <li className="nav-item">
           <Link className="nav-link" to={'/wishList'}>WishList</Link>
         </li>      
         <li className="nav-item">
           <Link className="nav-link" to={'/products'}>Products</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to={'/categories'}>Categories</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to={'/brands'}>Brands</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to={'/allorders'}>Orders</Link>
         </li>
       </ul>
       }
       


        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          <li className="nav-item d-flex align-items-center ">  
          <Link to={'/cart'} className='text-black me-5 mt-2'>
          <i className="fa-solid fa-cart-shopping position-relative fa-2x">
            <span className='position-absolute fs-6 bg-main rounded-circle p-2 top-0 start-100 translate-middle '>{cart.numOfCartItems || 0}</span>
          </i>  
          </Link>   
          <i className="mx-2 fa-brands fa-facebook"></i>
          <i className="mx-2 fa-brands fa-twitter"></i>
          <i className="mx-2 fa-brands fa-instagram"></i>
          <i className="mx-2 fa-brands fa-youtube"></i>
          <i className="mx-2 fa-brands fa-tiktok"></i>
          </li>

         {
          userIsLoggedIn ?
        
          <li className="nav-item">
            <span onClick={logOut} className="nav-link cursor-pointer">LogOut</span>
          </li>
      
          :
         <>
          <li className="nav-item">
            <Link className="nav-link " to={'/login'}>Log in </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to={'/register'}>Register</Link>
          </li>  
         </> 
         }

         
        
        </ul>
       
      </div>
    </div>
  </nav>
  )
}

