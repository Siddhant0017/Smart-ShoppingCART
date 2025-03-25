import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import products from '../products';
import '../styles/ProductPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  
  const product = products.find(p => p.id === parseInt(id));
  const isInCart = cartItems.some(item => item.id === product?.id);

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-nav">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Products
        </button>
      </div>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <p className="product-description">{product.description}</p>
          
          <button 
            onClick={handleCartAction}
            className={`cart-button ${isInCart ? 'remove' : 'add'}`}
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;