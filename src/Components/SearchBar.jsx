import { useState, useEffect, useRef } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    
    onSearch(value);
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    onSearch(product.name);
    setIsOpen(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setSuggestions.length && setIsOpen(true)}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="suggestions-container">
          {suggestions.map(product => (
            <div
              key={product.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(product)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="suggestion-image"
              />
              <div className="suggestion-info">
                <span className="suggestion-name">{product.name}</span>
                <span className="suggestion-price">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;