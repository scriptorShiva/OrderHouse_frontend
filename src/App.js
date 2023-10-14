import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./protected_routes/PrivateRoutes";
import Items from "./pages/Items";
import { CartContext } from "./context/CartContext";

function App() {
  const [cart, setCart] = useState({});
  //fetch cart from localStorage
  useEffect(() => {
    //fetch from ls
    const cart = window.localStorage.getItem("cart");
    setCart(cart);
  }, []);

  useEffect(() => {
    //when cart change useEffect calls
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <ToastContainer position="top-right" />
      <CartContext.Provider value={{ cart, setCart }}>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="restaurants" element={<Products />} />
            <Route path="items" element={<Items />} />
            <Route path="single/:restaurantId" element={<SingleProduct />} />
          </Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
