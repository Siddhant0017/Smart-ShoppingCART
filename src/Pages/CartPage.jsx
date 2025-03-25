import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/actions/cartActions';
import CartItem from '../Components/CartItem';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, totalItems, totalPrice } = useSelector(state => state.cart);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      await dispatch(clearCart());
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0 && quantity <= 99) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      dispatch(removeFromCart(id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty</h2>
        <button 
          className="continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart ({totalItems} items)</h2>
      <div className="cart-items-container">
        {cartItems.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
          />
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-details">
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
          <p>Tax (10%): ${(totalPrice * 0.1).toFixed(2)}</p>
          <h3>Total: ${(totalPrice * 1.1).toFixed(2)}</h3>
        </div>
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartPage;