import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="hamburger" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Phone Store</Link></li>
            <li><NavLink to="/add-phone" onClick={() => setIsMenuOpen(false)}>Add Phone</NavLink></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          </ul>
        </div>
        {/* Hide search bar in navbar on mobile */}
        {!isMobile && (
          <div className="navbar-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for Phone..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="search-button"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Show search bar in body part only on mobile */}
      {isMobile && (
        <div className="body-search-container">
          <input
            type="text"
            placeholder="Search for Phone..."
            className="body-search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="body-search-button"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;