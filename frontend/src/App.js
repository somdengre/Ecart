import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"

import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import UpdateProfile from "./component/User/UpdateProfile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./component/Cart/Payment.js"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import DashBoard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UsersList from "./component/Admin/UsersList.js"
import UpdateUser from "./component/Admin/UpdateUser.js"
import ProductReviews from "./component/Admin/ProductReviews.js"
import Contact from "./component/layout/contact/Contact.js"
import About from "./component/layout/About/About.js"
import NotFound from "./component/layout/NotFound/NotFound.js"

function App() {


  const { user, isAuthenticated } = useSelector(state => state.user)

  const [stripeApiKey,setStripeApiKey] = React.useState("");

  async function getStripeApiKey() { 
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    // console.log("before user Updated");
    store.dispatch(loadUser());
    getStripeApiKey();
    // console.log("after userupdated");
  }, []);

  // return (
  return (<Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>

    {stripeApiKey && <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)} ><ProtectedRoute Component={Payment} /></Elements>} />}

    </Routes>
    <Routes>
      <Route exact path="/" element={<><Home /> <Footer /></>} />
      <Route exact path="/product/:id" element={<><ProductDetails /><Footer /></>} />
      <Route exact path="/products" element={<><Products /><Footer/></>} />
      <Route path="/products/:keyword" element={<><Products /><Footer/></>} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/account" element={<ProtectedRoute Component={Profile} />} />
      <Route exact path="/contact" element={<Contact/>} />
      <Route exact path="/about" element={<About/>} />


      <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
      <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword} />} />
      <Route exact path="/password/forgot" element={<ForgotPassword/>} />
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />

      <Route exact path="/login" element={<LoginSignUp />} />
      <Route exact path="/cart" element={<><Cart /><Footer /></>} />
      <Route exact path="/shipping" element={<><ProtectedRoute Component={Shipping} /><Footer/></>} />
      <Route exact path="/order/confirm" element={<><ProtectedRoute Component={ConfirmOrder} /><Footer/></>} />
      
      <Route exact path="/success" element={<><ProtectedRoute Component={OrderSuccess} /><Footer/></>} />
      <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders} />} />
      <Route exact path="/order/:id" element={<><ProtectedRoute Component={OrderDetails} /><Footer/></>} />
      <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin="true" Component={DashBoard} />} />
      <Route exact path="/admin/products" element={<ProtectedRoute isAdmin="true" Component={ProductList} />} />
      <Route exact path="/admin/product" element={<ProtectedRoute isAdmin="true" Component={NewProduct} />} />
      <Route exact path="/admin/product/:id" element={<ProtectedRoute isAdmin="true" Component={UpdateProduct} />} />
      <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin="true" Component={OrderList} />} />
      <Route exact path="/admin/order/:id" element={<ProtectedRoute isAdmin="true" Component={ProcessOrder} />} />
      <Route exact path="/admin/users" element={<ProtectedRoute isAdmin="true" Component={UsersList} />} />
      <Route exact path="/admin/user/:id" element={<ProtectedRoute isAdmin="true" Component={UpdateUser} />} />
      <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin="true" Component={ProductReviews} />} />
      <Route path='*'  element={window.location.pathname === "/process/payment" ? null : <><NotFound/><Footer/></>} />

      {/* <ProtectedRoute exact path="/account" element={<Profile />} /> */}
    </Routes>
    
  </Router>
    // <Home />
  );
}

export default App;
