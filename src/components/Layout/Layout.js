import React from 'react';
import { NavLink } from 'react-router-dom';
import links, { logos } from './navData';
import logo from '../../images/booking.png';

const Layout = () => (
  <nav>
    <img src={logo} alt="" />
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
);

export default Layout;
