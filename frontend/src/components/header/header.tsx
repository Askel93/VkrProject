import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'

import './Header.css'
import { jwtSelector } from '../../selector';

const Header = () => {
  const { pathname } = useLocation();

  const { isAuth } = useSelector(jwtSelector)

  const onLogout = () => {
    localStorage.clear();
  }

  return (
    <Nav
      activeKey={pathname}>
      <Nav.Item>
        <Link to="/ship">Корабли</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/ownoperator">Владельцы / Операторы</Link>
      </Nav.Item>
        {isAuth 
        ? (
          <>
            <Nav.Item>
              <Link to="/excel">Excel</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/profile">Профиль</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/auth/logout">Logout</Link>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <Link to="/auth/signin">Login</Link>
          </Nav.Item>
        )}
    </Nav>
  )
}

export default Header;