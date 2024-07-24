
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/pnr-status">PNR Status</Link>
        </li>
        <li>
          <Link to="/train-status">Train Status</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
