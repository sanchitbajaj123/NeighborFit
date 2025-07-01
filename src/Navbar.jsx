import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🌇 NeighborFit</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/find">Find Neighborhood</Link>
        <Link to="/submit">Submit Review</Link>
      </div>
    </nav>
  );
}
