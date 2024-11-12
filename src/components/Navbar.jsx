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
    </nav>
  )
}

export default Navbar