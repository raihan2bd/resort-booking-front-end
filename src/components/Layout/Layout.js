import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
} from 'react-icons/fa';
import links from './navData';
import logoImage from '../../images/logo.jpeg';
import { fetchLogout } from '../../redux/auth/authSlice';

const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const showNavbar = () => {
    setShowNav((preState) => !preState);
  };

  const navClasses = showNav ? 'col-md-3 col-lg-3 shadow vh-100 navigation show' : 'col-md-3 col-lg-3 shadow vh-100 navigation';
  const mainClasses = showNav ? 'col-md-9 col-lg-9 full-screen' : 'col-md-9 col-lg-9';

  return (
    <div className="row">
      <nav className={navClasses}>
        <button
          type="button"
          className="nav-btn nav-close-btn btn btn-outline-dark px-2 py-1"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
        <div className="logo-image mt-3">
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
        <header className="bg-success text-light px-5 py-3">
          <div className="icons d-flex justify-content-between">
            <button type="button" className="btn btn-outline-light" onClick={showNavbar}>
              <FaBars />
            </button>
            {!auth.userId ? (
              <a
                href="/login"
                className="btn btn btn-outline-light d-block"
              >
                <FaUserCircle />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => dispatch(fetchLogout({ token: auth.token }))}
              >
                Logout
              </button>
            )}
          </div>
        </header>
        <div className="main-content">{children}</div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
