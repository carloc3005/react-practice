import { formatMoney } from '../utils/money';
import dayjs from 'dayjs';

function OrderSummary({ cart, delivery }) {
  if (delivery.length === 0) {
    return null;
  }

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const selectedDeliveryOption = delivery.find(
          (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId
        );

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date:{' '}
              {selectedDeliveryOption
                ? dayjs()
                    .add(selectedDeliveryOption.deliveryDays, 'day')
                    .format('dddd, MMMM D')
                : delivery.length > 0
                ? 'Select a delivery option'
                : 'Loading...'}
            </div>

            <div className="cart-item-details-grid">
              <img
                className="product-image"
                src={cartItem.product.image}
                alt={cartItem.product.name}
              />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity:{' '}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">Update</span>
                  <span className="delete-quantity-link link-primary">Delete</span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {delivery.map((deliveryOption) => {
                  let priceString = 'FREE Shipping';
                  if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                  }
                  return (
                    <div key={deliveryOption.id} className="delivery-option">
                      <input
                        type="radio"
                        checked={deliveryOption.id === cartItem.deliveryOptionId}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`}
                        readOnly
                      />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs()
                            .add(deliveryOption.deliveryDays, 'day')
                            .format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">{priceString}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSummary;
