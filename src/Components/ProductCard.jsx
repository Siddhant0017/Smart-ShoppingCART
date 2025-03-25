import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isInCart, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await onAddToCart(product);
    } catch (error) {
      setError('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/placeholder-image.png';
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      {error && <p className="error-message">{error}</p>}
      <button 
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`cart-button ${isInCart ? 'remove' : 'add'} ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? 'Processing...' : isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;