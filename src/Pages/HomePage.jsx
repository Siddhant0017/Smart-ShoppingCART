import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import ProductList from '../Components/ProductList';
import SearchBar from '../Components/SearchBar';
import products from '../products';
import '../styles/ProductPage.css';
import '../styles/HomePage.css';

const HomePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const handleSearch = (searchTerm) => {
    try {
      setIsLoading(true);
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } catch (error) {
      setError('Failed to search products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart(product));
    } catch (error) {
      setError('Failed to add item to cart');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="page-title">Welcome to Smart Shopping</h1>
        <SearchBar onSearch={handleSearch} products={products} />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-section">
          <h2 className="section-title">Our Products</h2>
          <ProductList 
            products={filteredProducts} 
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;