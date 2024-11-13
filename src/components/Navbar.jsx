import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom'



function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle the input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Pass the search term to the parent component
  };
  return (
    <nav>
        <ul>
            <li><Link to="/">Phone Store</Link></li>
            <li><NavLink to="/add-phone">Add Phone</NavLink></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <div className="search-container">
        <input type="text" placeholder="Search for Phone..." className="search-input" value={searchTerm} onChange={handleSearchChange} />
        <button type="submit" className="search-button">Search</button>
      </div>
    </nav>
  )
}

export default Navbar