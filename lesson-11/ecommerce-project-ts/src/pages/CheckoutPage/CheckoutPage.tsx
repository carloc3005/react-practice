import './checkout-header.css';
import './checkout.css';
import PaymentSummary from '../../components/PaymentSummary';
import OrderSummary from '../../components/OrderSummary';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Define interfaces for props and state
interface CartItem {
  id: string;
  quantity: number;
  // Add other properties of a cart item here
}

interface DeliveryOption {
  id: string;
  name: string;
  // Add other properties of a delivery option here
}

interface PaymentSummaryData {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}

interface CheckoutPageProps {
  cart: CartItem[];
  handleDeliveryOptionChange: (itemId: string, optionId: string) => void;
  handleDeleteItem: (itemId: string) => void;
  handleUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

function CheckoutPage({ cart, handleDeliveryOptionChange, handleDeleteItem, handleUpdateQuantity }: CheckoutPageProps) {
  const [delivery, setDelivery] = useState<DeliveryOption[]>([]);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryData | null>(null);

  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDelivery(deliveryResponse.data);
    };

    fetchDeliveryOptions();
  }, []); // Fetch delivery options only once on mount

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      if (cart && cart.length > 0) { // Only fetch if cart is available and not empty
        const paymentResponse = await axios.get('/api/payment-summary');
        setPaymentSummary(paymentResponse.data);
      } else if (cart && cart.length === 0) {
        // Optionally, set a default or empty payment summary if cart is empty
        setPaymentSummary({
          totalItems: 0,
          productCostCents: 0,
          shippingCostCents: 0,
          totalCostBeforeTaxCents: 0,
          taxCents: 0,
          totalCostCents: 0,
        });
      }
    };

    fetchPaymentSummary();
  }, [cart]); // Re-fetch payment summary when cart changes

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
              {cart.length} items
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
          <OrderSummary cart={cart} delivery={delivery} handleDeliveryOptionChange={handleDeliveryOptionChange} handleDeleteItem={handleDeleteItem} handleUpdateQuantity={handleUpdateQuantity} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
