import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { totalItems } = useSelector(state => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Smart Cart
        </Link>
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="menu-icon"></span>
        </button>
      </div>

      <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>
        <Link to="/profile" className="nav-link profile-link">
          <span className="user-name">{user.name}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;