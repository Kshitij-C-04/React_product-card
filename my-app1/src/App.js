import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products'); 
        setProducts(response.data.products); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{product.title}</h3>
            <p style={{ fontWeight: 'bold' }}>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`); 
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} style={{ width: '200px', height: '200px' }} />
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>Price: ${product.price}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
