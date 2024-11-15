import React from "react";
import { Redirect } from "react-router-dom";

//Authentication Flow
import Login from "../pages/AuthenticationFlow/Login";
import Register from "../pages/AuthenticationFlow/Registration";
import ForgetPwd from "../pages/AuthenticationFlow/ForgotPassword";
import Resetpwd from "../pages/AuthenticationFlow/ResetPassword";

import Loader from "../components/Custom/customLoader";
import UserDashboard from "../pages/User/UserDashboard/index"
import Dashboard from "../pages/User/UserDashboard/userDashboard"
import AdminDashboard from "../components/Admin/AdminDashboard";

// Dashboard
import Modal from "../pages/User/AddProduct/model"
import Product from "../pages/User/AddProduct/index"
import Vehical from "../pages/User/AddProduct/vehical"
import Accommodation from "../pages/User/AddProduct/accomodation";
import Electronics from "../pages/User/AddProduct/electronics";
import Profile from "../pages/User/AddProduct/userprofile";
import ProductDescription from "../pages/User/UserDashboard/productDescription";

//Utility
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

import ResendVerification from "../pages/AuthenticationFlow/Login/resendVerificationMail";
import Furniture from "../pages/User/AddProduct/furniture";
import Services from "../pages/User/AddProduct/services";


const authProtectedRoutes = [




  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/user-dasboard" />,
  },
];

const publicRoutes = [
  { path: "/loader", component: Loader },
  
  //authentication routes
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/auth/reset-password", component: Resetpwd },
  { path: "/verification", component: ResendVerification },
  //user dashboard
  { path: "/dashboard", component: UserDashboard },

  //admin dasnoard
  {path:"/admin",component:AdminDashboard},
  //product base page
  { path: "/product", component: Product },

  //categorical modeal page
  { path: "/modal", component: Modal },

  //post vehical ads
  { path: "/vehical", component: Vehical },

  //post accomodation ads
  { path: "/accommodation", component: Accommodation },

  //post electronics ads
  { path: "/electronics", component: Electronics },

  //post furniture ads
  { path: "/furniture", component: Furniture },

  //post furniture ads
  { path: "/services", component: Services },

  //user profile page
  { path: "/profile", component: Profile },

  //product description page
  { path: "/productDescription", component: ProductDescription },
  {path:"/user-dashboard" ,component:Dashboard},

  //error pages
  { path: "/pages-404", component: Error404 },
  { path: "/pages-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
