import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import links, { logos } from './navData';
import logo from '../../images/booking.png';

const Layout = ({ children }) => (
  <div className="row">
    <nav className="col-md-3 col-lg-3 shadow vh-100">
      <div className="logo-image">
        <img src={logo} alt="" />
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
          <>{logo}</>
        ))}
      </div>
      <p>
        {' '}
        ©
        {new Date().getFullYear()}
        {' '}
        Michael Kithinji
      </p>
    </nav>
    <main className="col-md-9 col-lg-9">
      <header>
        <div className="menu">...</div>
        <div className="somehing">Logo</div>
        <div className="something">Login or Logout</div>
      </header>
      <div className="main-content">
        {children}
      </div>
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
