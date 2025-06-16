import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage/Homepage';
import OrdersPage from './pages/OrdersPage/OrdersPage'; // Updated import path
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import axios from 'axios';
import './App.css';
import TrackingPage from './pages/TrackingPage';


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };

    fetchAppData();
  }, []);


  return (
    <Router>
      <Routes>
        <Route index element={<Homepage cart={cart}/>} />
        <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
        <Route path="orders" element={<OrdersPage cart={cart}/>} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </Router>
  )
}

export default App
