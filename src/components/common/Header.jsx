import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-left">
          <div className="logo">📦</div>
          <h1>Inward-Outward Management System</h1>
        </Link>
        <div className="header-right">
          <span className="user-name">Welcome, Admin</span>
          <span className="current-date">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
