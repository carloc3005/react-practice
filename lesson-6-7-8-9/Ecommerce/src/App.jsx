import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter as Router
import Homepage from './pages/HomePage/Homepage';
import OrdersPage from './pages/OrdersPage/OrdersPage'; // Updated import path
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import axios from 'axios';
import './App.css';
import TrackingPage from './pages/TrackingPage';


function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  const handleDeliveryOptionChange = async (productId, deliveryOptionId) => {
    try {
      await axios.put(`/api/cart-items/${productId}`, { deliveryOptionId });
      loadCart(); // Reload cart to reflect changes
    } catch (error) {
      console.error('Error updating delivery option:', error);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      await axios.delete(`/api/cart-items/${productId}`);
      loadCart(); // Reload cart to reflect changes
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      // Ensure quantity is a positive number
      const newQuantity = Math.max(1, parseInt(quantity, 10));
      await axios.put(`/api/cart-items/${productId}`, { quantity: newQuantity });
      loadCart(); // Reload cart to reflect changes
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);


  return (

    <Routes>
      <Route index element={<Homepage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} handleDeliveryOptionChange={handleDeliveryOptionChange} handleDeleteItem={handleDeleteItem} handleUpdateQuantity={handleUpdateQuantity} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>

  )
}

export default App
