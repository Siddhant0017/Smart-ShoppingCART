import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['SET_CART_ERROR'],
      },
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {
    cart: {
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      error: null,
      loading: false
    }
  }
});

// Enable hot reloading in development
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;