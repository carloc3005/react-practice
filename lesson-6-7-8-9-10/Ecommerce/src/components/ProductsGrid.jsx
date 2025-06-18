import { formatMoney } from '../utils/money';
import axios from 'axios';
import {useState} from 'react';
import ProductItem from './ProductItem';

function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {Array.isArray(products) && products.map((product) => (
        <ProductItem key={product.id} product={product} loadCart={loadCart} />
      ))}
    </div>
  );
}

export default ProductsGrid;
