import { it, expect, describe, vi, beforeEach } from 'vitest';
import ProductItem from '../../components/ProductItem'; // Corrected import
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('Product component', () => {
	it('displays the product details correctly', () => {
		let product; 

		let loadCart;

		beforeEach(() => {
			product = {
			"id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			"image": "images/products/athletic-cotton-socks-6-pairs.jpg",
			"name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
			"rating": {
				"stars": 4.5,
				"count": 87
			},
			"priceCents": 1090,
			"keywords": ["socks", "sports", "apparel"]
		};

		loadCart = vi.fn

		});

		render(<ProductItem product={product} loadCart={loadCart} />); // Changed to ProductItem

		// Check for product name
		expect(
			screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
		).toBeInTheDocument();

		// Check for product price
		expect(
			screen.getByText('$10.90')
		).toBeInTheDocument();

		// Check for product image src
		const productImage = screen.getByAltText('Black and Gray Athletic Cotton Socks - 6 Pairs');
		expect(productImage).toBeInTheDocument();
		expect(productImage).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

		// Check for rating image (optional, but good to have)
		const ratingImage = screen.getByAltText('4.5 stars');
		expect(ratingImage).toBeInTheDocument();
		expect(ratingImage).toHaveAttribute('src', 'images/ratings/rating-45.png');
	});

	it('adds a product to the cart', async () => {
		const product = {
			"id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			"image": "images/products/athletic-cotton-socks-6-pairs.jpg",
			"name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
			"rating": {
				"stars": 4.5,
				"count": 87
			},
			"priceCents": 1090,
			"keywords": ["socks", "sports", "apparel"]
		}

		const loadCart = vi.fn();

		render(<ProductItem product={product} loadCart={loadCart} />); // Changed to ProductItem

		const user = userEvent.setup();
		const addToCartButton = screen.getByRole('button', { name: /add to cart/i }); // More robust selector
		await user.click(addToCartButton);

		expect(axios.post).toHaveBeenCalledWith('/api/cart-items', { // Verify endpoint and payload
			productId: product.id,
			quantity: 1 // Assuming default quantity is 1, adjust if different
		});
		expect(loadCart).toHaveBeenCalled(); // Verify loadCart was called
	});
});