import { formatMoney } from '../utils/money';
import dayjs from 'dayjs';
import { useState } from 'react'; // Import useState

function OrderSummary({ cart, delivery, handleDeliveryOptionChange, handleDeleteItem, handleUpdateQuantity }) {
  // Add state for managing the quantity input for each item
  const [editingQuantity, setEditingQuantity] = useState({}); // productId: newQuantity

  if (delivery.length === 0 && cart.length > 0) { // Keep showing loading or options if cart has items
    // return null; // Or some loading indicator for delivery options
  }

  const handleQuantityInputChange = (productId, value) => {
    setEditingQuantity(prev => ({ ...prev, [productId]: value }));
  };

  const handleSaveQuantity = (productId) => {
    const newQuantity = editingQuantity[productId];
    if (newQuantity !== undefined && newQuantity !== '' && parseInt(newQuantity, 10) > 0) {
      handleUpdateQuantity(productId, parseInt(newQuantity, 10));
    }
    // Clear editing state for this product
    setEditingQuantity(prev => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  const handleUpdateClick = (productId, currentQuantity) => {
    setEditingQuantity(prev => ({ ...prev, [productId]: currentQuantity.toString() }));
  };

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
                    Quantity: <span className="quantity-label">
                      {editingQuantity[cartItem.productId] !== undefined ? (
                        <input 
                          type="number" 
                          value={editingQuantity[cartItem.productId]} 
                          onChange={(e) => handleQuantityInputChange(cartItem.productId, e.target.value)}
                          onBlur={() => handleSaveQuantity(cartItem.productId)} // Save on blur
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveQuantity(cartItem.productId)} // Save on Enter
                          className="quantity-input"
                          min="1"
                        />
                      ) : (
                        cartItem.quantity
                      )}
                    </span>
                  </span>
                  {editingQuantity[cartItem.productId] !== undefined ? (
                    <span className="save-quantity-link link-primary" onClick={() => handleSaveQuantity(cartItem.productId)}>Save</span>
                  ) : (
                    <span className="update-quantity-link link-primary" onClick={() => handleUpdateClick(cartItem.productId, cartItem.quantity)}>Update</span>
                  )}
                  <span className="delete-quantity-link link-primary" onClick={() => handleDeleteItem(cartItem.productId)}>Delete</span>
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
                    <div key={deliveryOption.id} className="delivery-option" onClick={() => handleDeliveryOptionChange(cartItem.productId, deliveryOption.id)}>
                      <input
                        type="radio"
                        checked={deliveryOption.id === cartItem.deliveryOptionId}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`}
                        onChange={() => handleDeliveryOptionChange(cartItem.productId, deliveryOption.id)}
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
