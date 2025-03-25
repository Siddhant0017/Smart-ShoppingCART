const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <div className="item-info">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <div className="item-quantity">
        <button 
          onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.quantity + 1)}>+</button>
      </div>
      <div className="item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <button onClick={onRemove} className="remove-btn">Remove</button>
    </div>
  );
};

export default CartItem;