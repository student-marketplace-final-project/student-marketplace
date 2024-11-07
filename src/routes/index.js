import React from "react";
import { Redirect } from "react-router-dom";

//Authentication Flow
import Login from "../pages/AuthenticationFlow/Login";
import Register from "../pages/AuthenticationFlow/Registration";
import ForgetPwd from "../pages/AuthenticationFlow/ForgotPassword";
import Resetpwd from "../pages/AuthenticationFlow/ResetPassword";
import Activation from "../pages/AuthenticationFlow/Registration/activation";
import Loader from "../components/Custom/customLoader";
import UserDashboard from "../pages/User/UserDashboard/index"



// Dashboard
import Modal from "../pages/User/AddProduct/model"
import Product from "../pages/User/AddProduct/index"
import AddForm from "../pages/User/AddProduct/vehical"
import Accommodation from "../pages/User/AddProduct/accomodation";
import Electronics from "../pages/User/AddProduct/electronics";
import Profile from "../pages/User/AddProduct/userprofile"

//Utility
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

import ResendVerification from "../pages/AuthenticationFlow/Login/resendVerificationMail";


const authProtectedRoutes = [
  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/usage" />,
  },
];

const publicRoutes = [
  { path: "/loader", component: Loader },
  { path: "/activation", component: Activation },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/auth/reset-password", component: Resetpwd },
  { path: "/verification", component: ResendVerification },


  { path: "/usage", component: UserDashboard },
  { path: "/product", component: Product },
  { path: "/modal", component: Modal },
  { path: "/addform", component: AddForm },
  { path: "/accommodation", component: Accommodation },
  { path: "/electronics", component: Electronics },
  { path: "/profile", component: Profile },

  { path: "/pages-404", component: Error404 },
  { path: "/pages-500", component: Error500 },
];

export { authProtectedRoutes, publicRoutes };
