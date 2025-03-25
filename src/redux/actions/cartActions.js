// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_CART_ERROR = 'SET_CART_ERROR';

// Action creators
export const addToCart = (product) => {
  try {
    if (!product || !product.id) {
      throw new Error('Invalid product data');
    }
    
    return {
      type: ADD_TO_CART,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    };
  } catch (error) {
    return setCartError(error.message);
  }
};

export const removeFromCart = (productId) => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    return {
      type: REMOVE_FROM_CART,
      payload: productId
    };
  } catch (error) {
    return setCartError(error.message);
  }
};

export const updateQuantity = ({ id, quantity }) => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }
    
    if (quantity < 1 || quantity > 99) {
      throw new Error('Quantity must be between 1 and 99');
    }

    return {
      type: UPDATE_QUANTITY,
      payload: {
        id,
        quantity: parseInt(quantity, 10)
      }
    };
  } catch (error) {
    return setCartError(error.message);
  }
};

export const clearCart = () => ({
  type: CLEAR_CART
});

export const setCartError = (error) => ({
  type: SET_CART_ERROR,
  payload: error
});

// Async action creator example (if using Redux Thunk)
export const addToCartAsync = (product) => {
  return async (dispatch) => {
    try {
      // Simulate API call or validation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch(addToCart(product));
    } catch (error) {
      dispatch(setCartError(error.message));
    }
  };
};