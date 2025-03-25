import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={() => onUpdateQuantity(item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.quantity + 1)}>+</button>
        </div>
      </div>
      <button onClick={onRemove} className="remove-btn">Remove</button>
    </div>
  );
};

export default CartItem;