import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router'
import CheckoutPage from './pages/Checkoutpage'
import OrdersPage from './pages/Orderspage'
import TrackingPage from './pages/TrackingPage';


function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      })
  }, [])


  return (
    <Routes>
      <Route index element={<Homepage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>

  )
}

export default App
