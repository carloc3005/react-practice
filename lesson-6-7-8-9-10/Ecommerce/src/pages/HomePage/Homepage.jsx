import { Link } from 'react-router-dom';
import Header from '../../components/Header'; // Adjusted path
import './Homepage.css'; // Adjusted path
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductsGrid from '../../components/ProductsGrid'; // Adjusted path

function Homepage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        }
        
        getHomeData();
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}

export default Homepage;
