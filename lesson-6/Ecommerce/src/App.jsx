import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkoutpage'
import OrdersPage from './pages/Orderspage'
import TrackingPage from './pages/TrackingPage';


function App() {

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
    
  )
}

export default App
