import './checkout-header.css';
import './checkout.css';
import PaymentSummary from '../../components/PaymentSummary';
import OrderSummary from '../../components/OrderSummary';
import axios from 'axios';
import { useState, useEffect } from 'react';

function CheckoutPage({ cart }) {
  const [delivery, setDelivery] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDelivery(deliveryResponse.data);

      const paymentResponse = await axios.get('/api/payment-summary');
      setPaymentSummary(paymentResponse.data);
    };

    fetchCheckoutData();
  }, []);

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="index.html">
              <img className="logo" src="/images/logo.png" alt="Logo" />
              <img className="mobile-logo" src="/images/mobile-logo.png" alt="Mobile Logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="index.html">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" alt="Secure Checkout" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} delivery={delivery} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
