import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/' },
        { name: 'Inward Entry', icon: '📥', path: '/inward' },
        { name: 'Outward Entry', icon: '📤', path: '/outward' },
        { name: 'Combined Entry', icon: '📋', path: '/combined' },
        { name: 'Office Master', icon: '🏢', path: '/masters/offices' },
        { name: 'Mode Master', icon: '⚙️', path: '/masters/modes' },
        { name: 'From/To Master', icon: '📍', path: '/masters/fromto' },
        { name: 'Courier Company Master', icon: '🚚', path: '/masters/couriers' }
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <div className="sidebar-logo">
                    <h2>IOMS</h2>
                </div>
                <ul className="menu-list">
                    {menuItems.map((item, index) => (
                        <li key={index} className="menu-item">
                            <Link to={item.path} className="menu-button">
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
