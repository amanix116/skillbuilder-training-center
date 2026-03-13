import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">▶</span> SkillBuilder Training Center
          </Link>
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/courses" className="nav-link" onClick={closeMenu}>Courses</Link></li>
            <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
            {isAdmin ? (
              <>
                <li><Link to="/admin/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link></li>
                <li><button onClick={() => { handleLogout(); closeMenu(); }} className="nav-btn logout-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/admin/login" className="nav-btn login-btn" onClick={closeMenu}>Admin</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
