import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import {Provider} from 'react-redux';
import store from './redux/store';
import HomePage from './Pages/HomePage';
import ProductDetailPage from './Pages/ProductDetailPage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ProfilePage from './Pages/ProfilePage';
import Navbar from './Components/Navbar';



import './styles/App.css';
import './styles/Navbar.css';
import './styles/ProductCard.css';
import './styles/CartPage.css';
import './styles/CartItem.css';
import './styles/ProfilePage.css';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/product/:id" element={<ProductDetailPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
          </Routes>
        </Router>

      </UserProvider>
    </Provider>
   
  );
}

export default App;
