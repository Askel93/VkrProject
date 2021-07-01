import React, { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap'

import { jwtSelector } from '../../selector';
import { MenuIcon } from '../util/icon';
import Excel from '../excel';
import AccordionItem from '../util/accordion';
import { jwtRemoveToken } from '../../actions/jwt';

import './Header.css'

const Header = () => {
  const { pathname } = useLocation();

  const [activeKey, setActive] = useState("");
  const { isAuth } = useSelector(jwtSelector)
  const eventKey = "menu";
  const onItemClick = () => setActive("");

  return (
    <>
      <Nav activeKey={pathname} className="menu">
        <Menu isAuth={isAuth} pathname={pathname} />
      </Nav>
      <AccordionItem
        toggle={<MenuIcon style={{ float: 'right', color: 'white' }} />}
        className="mobile-menu"
        eventKey={eventKey}
        activeKey={activeKey}
        onToggleClick={(key) => setActive(key || "")}>
        <Menu isAuth={isAuth} className="mobile-list" onItemClick={onItemClick} pathname={pathname} />
      </AccordionItem>
    </>
  )
}

const Menu = ({
  isAuth,
  className = "menu-list",
  pathname,
  onItemClick = () => { },
}: { isAuth: boolean, className?: string, pathname: string, onItemClick?: () => void }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(jwtRemoveToken());
    onItemClick();
  }

  return (
    <div className={className}>
      <ItemMemo 
        url="/ships/1/20/id"
        active={pathname.includes("/ships")} 
        onItemClick={onItemClick}
        pathName={pathname}>
        Судна
      </ItemMemo>
      <ItemMemo url="/ownoperators/1/20/name" active={pathname.includes("/ownoperators")} onItemClick={onItemClick} pathName={pathname}>
        Владельцы / Операторы
      </ItemMemo>
      {isAuth
        ? (
          <>
            <ItemMemo active={false} onItemClick={onItemClick} pathName={pathname}>
              <Excel />
            </ItemMemo>
            <ItemMemo active={pathname.includes("/profile")} onItemClick={onItemClick} url="/profile" pathName={pathname}>
              Профиль
            </ItemMemo>
            <ItemMemo active={false} onItemClick={onItemClick} pathName={pathname}>
              <Button variant="link" className="m-0 p-0" onClick={onLogout}>Logout</Button>
            </ItemMemo>
          </>
        ) : (
          <ItemMemo active={pathname.includes("/auth")} onItemClick={onItemClick} url="/auth/signin" pathName={pathname}>
            Login
          </ItemMemo>
        )}
    </div>
  );
}

const Item = ({ active, children, url, onItemClick, pathName }: { active: boolean, children?: ReactNode, url?: string, onItemClick: () => void, pathName: string }) => {
  return (
    <Nav.Item className={active ? "active" : undefined}>
      {!url
        ? <>{children}</>
        : <Link to={{pathname: url, state: { prevPath: pathName }}} onClick={onItemClick}>{children}</Link>}
    </Nav.Item>
  )
}

const ItemMemo = React.memo(Item, (prev, next) => prev.active === next.active);

export default Header;