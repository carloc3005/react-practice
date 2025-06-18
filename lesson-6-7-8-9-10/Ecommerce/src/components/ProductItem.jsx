import { useState } from 'react';
import { formatMoney } from '../utils/money';
import axios from 'axios';

function ProductItem({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [addedMessageVisible, setAddedMessageVisible] = useState(false);

  const handleAddToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity: quantity
    });
    await loadCart();
    setAddedMessageVisible(true);
    setTimeout(() => {
      setAddedMessageVisible(false);
    }, 2000);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select 
          value={quantity} 
          onChange={(event) => {
            const quantitySelected = Number(event.target.value);
            setQuantity(quantitySelected);
          }}
          aria-label={`Quantity for ${product.name}`}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: addedMessageVisible ? 1 : 0, transition: 'opacity 0.5s' }}>
        <img src="images/icons/checkmark.png" alt="Checkmark" />
        Added
      </div>

      <button 
        className="add-to-cart-button button-primary" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;
