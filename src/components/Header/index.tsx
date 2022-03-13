import { useState } from 'react';

import './Header.scss';
import logo from '../../assets/logo.png';

import { Link } from 'react-router-dom';
import { SwipeableDrawer } from '@mui/material';

import { ROUTES } from '../../types';

// Data containing the links that will be displayed on the Nav Bar

const links: { title: string; path: ROUTES; }[] = [
  { title: "Models", path: ROUTES.MODELS },
  { title: "Contact", path: ROUTES.CONTACT },
  { title: "About", path: ROUTES.ABOUT }
]

/**
 * Header will display the links leading to the different pages of the App
 * It will be in a Drawer menu format on small devices
 */

const Header = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  return (
    <div className="header">
      <div className="header__drawer-button" onClick={(toggleDrawer)}>
        <div className="header__drawer-button__line" />
        <div className="header__drawer-button__line" />
        <div className="header__drawer-button__line" />
      </div>
      <SwipeableDrawer
        open={showDrawer}
        onClose={toggleDrawer}
        onOpen={() => setShowDrawer(true)}
      >
        <div className="header__drawer">
          <Link to={ROUTES.LANDING} className="header__drawer__logo" onClick={toggleDrawer}>
            <img src={logo} alt="Logo" />
            <div className="header__drawer__logo__title">AIV</div>
          </Link>
          {links.map(({ title, path }) => (
            <Link
              key={title}
              to={path}
              className="header__drawer__item"
              onClick={toggleDrawer}
            >
              {title}
            </Link>
          ))}
        </div>
      </SwipeableDrawer>
      <div className="header__logo">
        <Link to={ROUTES.LANDING} className="header__logo__content">
          <img src={logo} alt="Logo" />
          <div className="header__logo__content__title">AIVisualizer</div>
        </Link>
      </div>
      <div className="header__links">
        {links.map(({ title, path }) => (
          <Link key={title} to={path} className="header__links__link">{title}</Link>
        ))}
      </div>
    </div>
  );
};

export default Header;