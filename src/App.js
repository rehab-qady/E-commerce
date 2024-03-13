import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import Categories from "./Component/Categories/Categories";
import Brands from "./Component/Brands/Brands";
import Logout from "./Component/Logout/Logout";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import Layout from "./Component/Layout/Layout";
import Notfound from "./Component/Notfound/Notfound";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import AuthProtectedRoute from "./Component/ProtectedRoute/AuthProtectedRoute";
import Address from "./Component/Address/Address";
import AllOrders from "./Component/Orders/AllOrders";
import WishList from "./Component/WishList/WishList";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import CartContextProvider from "./Context/CartContextProvider";
import {QueryClient, QueryClientProvider} from 'react-query'
import ResetCode from "./Component/ResetCode/ResetCode"
import ResetPassword from "./Component/ResetPassword/ResetPassword";





export default function App() {


  const queryClient =new QueryClient();
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {path:'',element: <Navigate to={'/home'}/>},
        { path: "/home",       element: <ProtectedRoute> <Home />      </ProtectedRoute>  },
        { path: "/cart",       element: <ProtectedRoute> <Cart />      </ProtectedRoute> },
        { path: "/products",   element: <ProtectedRoute> <Products />  </ProtectedRoute> },
        { path: "/wishList",   element: <ProtectedRoute> <WishList/>  </ProtectedRoute> },
        { path: "/categories", element: <ProtectedRoute> <Categories/> </ProtectedRoute>  },
        { path: "/brands",     element: <ProtectedRoute> <Brands />    </ProtectedRoute> },
        { path: "/logout",     element: <ProtectedRoute> <Logout />    </ProtectedRoute>  },
        { path: "/productDetails/:id", element: <ProtectedRoute> <ProductDetails/>    </ProtectedRoute>  },
        { path: "/address/:cartId", element: <ProtectedRoute> <Address/> </ProtectedRoute>  },
        { path: "/allorders", element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>  },

        { path: "/login",   element:<AuthProtectedRoute> <Login /></AuthProtectedRoute>      },
        { path: "/register", element:<AuthProtectedRoute> <Register /></AuthProtectedRoute>      },
        { path: "/forgetPassword", element:<AuthProtectedRoute> <ForgetPassword/>  </AuthProtectedRoute>   },
        { path: "/resetCode", element:<AuthProtectedRoute> <ResetCode/>  </AuthProtectedRoute>   },
        { path: "/resetPassword", element:<AuthProtectedRoute> <ResetPassword/>  </AuthProtectedRoute>   },
        { path: '*', element: <Notfound/> },
      ],
    },
  ]);

  return (
    <>

<QueryClientProvider client={queryClient}>
    <CartContextProvider>
        <AuthContextProvider>
              <RouterProvider router={routers}></RouterProvider>
        </AuthContextProvider>
    </CartContextProvider>

 
</QueryClientProvider>





    <ToastContainer/>
    
    </>
  );
}
