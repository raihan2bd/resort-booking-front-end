import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaTwitter,
  FaFacebook,
  FaGooglePlus,
  FaVimeo,
  FaPinterest,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUserAltSlash,
} from 'react-icons/fa';
import links from './navData';
import logoImage from '../../images/logo.png';
import logo from '../../images/logo2.png';
import { fetchLogout } from '../../redux/auth/authSlice';
import PopupMessage from '../UI/PopupMessage';

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const ui = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setShowNav((preState) => !preState);
  };

  const closeNavbar = () => {
    setShowNav(false);
  };

  const navClasses = showNav
    ? 'col-md-3 col-lg-3 shadow vh-100 navigation show'
    : 'col-md-3 col-lg-3 shadow vh-100 navigation hide-sm-nav';
  const mainClasses = showNav
    ? 'col-md-9 col-lg-9 full-screen show-header-logo'
    : 'col-md-9 col-lg-9 offset-md-3 offset-lg-3';

  return (
    <div className="row gx-0">
      <nav className={navClasses}>
        <button
          type="button"
          className="nav-btn nav-close-btn btn btn-outline-dark px-2 py-1"
          onClick={toggleNavbar}
        >
          <FaTimes />
        </button>
        <div className="nav-logo p-3">
          <Link to="/">
            <img src={logoImage} alt="" />
          </Link>
        </div>
        <ul>
          {links.map((link) => (
            <li key={link.id} className="link">
              <NavLink to={link.path} onClick={closeNavbar}>
                <span>{link.title}</span>
              </NavLink>
            </li>
          ))}
          {auth.role === 'admin' && (
            <>
              <li className="link">
                <NavLink to="/add_resort" onClick={closeNavbar}>
                  <span>Add Resort</span>
                </NavLink>
              </li>
              <li className="link">
                <NavLink to="/delete-resort" onClick={closeNavbar}>
                  <span>Delete Resort</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="logos">
          <div>
            <FaTwitter />
            {' '}
          </div>
          <div>
            <FaFacebook />
            {' '}
          </div>
          <div>
            <FaGooglePlus />
            {' '}
          </div>
          <div>
            <FaVimeo />
            {' '}
          </div>
          <div>
            <FaPinterest />
            {' '}
          </div>
        </div>

        <p>
          {' '}
          ©
          {new Date().getFullYear()}
          {' '}
          Our platform services
        </p>
      </nav>
      <main className={mainClasses}>
        <header className="bg-success text-light px-3 py-3 header">
          <div className="icons d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-light btn-icon"
              onClick={toggleNavbar}
            >
              <FaBars />
            </button>
            <div className="logo-image me-auto">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </div>
            {!auth.userId ? (
              <Link
                to="/login"
                className="btn bg-orange text-light d-block border btn-icon"
              >
                <FaUserCircle />
              </Link>
            ) : (
              <button
                type="button"
                className="btn bg-orange text-light border btn-icon"
                onClick={() => dispatch(fetchLogout({ token: auth.token }))}
              >
                <FaUserAltSlash />
              </button>
            )}
          </div>
        </header>
        <div className="main-content">
          {ui.message && !ui.loading && (
          <div className="m-1">
            <PopupMessage />
          </div>
          )}
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
