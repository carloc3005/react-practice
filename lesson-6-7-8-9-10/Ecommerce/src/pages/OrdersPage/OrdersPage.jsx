import './orders.css';
import Header from '../../components/Header'; // Adjusted path
import axios from 'axios';
import { useState, useEffect } from 'react';
import { formatMoney } from '../../utils/money'; // Adjusted path
import dayjs from 'dayjs';

function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products').then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTime).format('MMMM D')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              {order.products.map((productDetails) => (
                <div key={productDetails.product.id} className="order-details-grid">
                  <div className="product-image-container">
                    {/* Assuming productDetails.product.image is a relative path from public or an absolute URL */}
                    <img src={productDetails.product.image} alt={productDetails.product.name} />
                  </div>

                  <div className="product-details">
                    <div className="product-name">{productDetails.product.name}</div>
                    <div className="product-delivery-date">
                      Arriving on: {dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')}
                    </div>
                    <div className="product-quantity">Quantity: {productDetails.quantity}</div>
                    <button className="buy-again-button button-primary">
                      <img
                        className="buy-again-icon"
                        src="/images/icons/buy-again.png" // Assuming this path is relative to public folder
                        alt="Buy Again"
                      />
                      <span className="buy-again-message">Add to Cart</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <a href={`tracking.html?orderId=${order.id}&productId=${productDetails.product.id}`}>
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
