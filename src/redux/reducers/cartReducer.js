const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  error: null,
  loading: false
};

const calculateTotals = (items) => {
  return items.reduce((totals, item) => ({
    totalItems: totals.totalItems + item.quantity,
    totalPrice: totals.totalPrice + (item.price * item.quantity)
  }), { totalItems: 0, totalPrice: 0 });
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      const updatedItems = existingItem
        ? state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalItems,
        totalPrice,
        error: null
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cartItems.filter(item => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalItems,
        totalPrice,
        error: null
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.cartItems.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, 99)) }
          : item
      );

      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalItems,
        totalPrice,
        error: null
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_CART_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'SET_CART_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    default:
      return state;
  }
};

export default cartReducer;