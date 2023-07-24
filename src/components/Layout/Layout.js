import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Make sure you have the react-icons library imported
import links, { logos } from './navData';
import logoImage from '../../images/booking.png'; // Rename this variable to avoid conflict with the logos array variable

const Layout = ({ children }) => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(
      'responsive_nav',
    );
  };

  return (
    <div className="row">
      <nav className="col-md-3 col-lg-3 shadow vh-100">
        <button
          type="button"
          className="nav-btn nav-close-btn"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>

        <button
          type="button"
          className="nav-btn"
          onClick={showNavbar}
        >
          <FaBars />
        </button>
        <div className="logo-image">
          <img src={logoImage} alt="" />
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.id} className="link">
              <NavLink to={link.path}>
                <span>{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="logos">
          {logos.map((logo) => (
            <div key={logo.id}>{logo}</div>
          ))}
        </div>

        <p>
          {' '}
          ©
          {new Date().getFullYear()}
          {' '}
          Our platform services
        </p>
      </nav>
      <main className="col-md-9 col-lg-9">
        <header>
          <div className="menu">Welcome to Our Platform</div>
          <div className="image">
            {/* <img src={logoImage} alt="" /> */}
          </div>
        </header>
        <div className="main-content">
          {children}
        </div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
