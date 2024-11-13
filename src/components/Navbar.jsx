import React from "react";
import { Link, NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Phone Store</Link></li>
            <li><NavLink to="/add-phone">Add Phone</NavLink></li>
            <li><Link to="/about">About</Link></li>
        </ul>

        {/* <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search phones..."
          />
        <button type="submit">Search</button>
      </form> */}

    </nav>
  )
}

export default Navbar