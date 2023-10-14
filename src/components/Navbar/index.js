import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { TbAlignJustified as Hamburger } from "react-icons/tb";
import { IoMdClose as HamburgerClose } from "react-icons/io";
import { BsFillCartCheckFill as CartIcon } from "react-icons/bs";
import { RiShoppingBag3Fill as LogoIcon } from "react-icons/ri";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import UserProfile from "./components/UserProfile";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import Auth from "../../services/auth.service";

import {
  NavbarContainer,
  NavbarWrapper,
  ExtendedNavbarContainer,
  ExtendedUserProfileWrapper,
} from "./navbar";

import UtilService from "../../services/util.service";

const Navbar = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();
  //state
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [extendUserProfile, setExtendUserProfile] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const [userDetails, setUserDetails] = useState({});
  //context
  const { cart } = useContext(CartContext);

  //logout handler
  const logoutHandler = async () => {
    const res = await Auth.onLogOut();
    if (res.success) {
      toast.success("Successfully logout");
      setIsUserLoggedIn(false);
      navigate("/login");
    }
  };

  //reload when userLoggedIN or loggedOut
  useEffect(() => {
    setIsUserLoggedIn(UtilService.isLoggedIn());
  }, [isUserLoggedIn]);

  //function: to set active state on route change
  return (
    <>
      <NavbarWrapper>
        <NavbarContainer className="navbar">
          <Link className="navbar__logo" to="/home">
            <LogoIcon size={30} className="navbar__logo-icon" />
            FUNFOODS
          </Link>
          <ul className="navbar__menu">
            {links.map((link, index) => (
              <li className="navbar__menu-item" key={index}>
                <Link
                  className={classNames("navbar__menu-link", {
                    "navbar__menu-active-page-link":
                      link.route === location.pathname,
                  })}
                  to={link.route}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar__icon-wrapper">
            <div
              className="navbar__icon-wrapper__user-profile-icon"
              onClick={() => setExtendUserProfile((curr) => !curr)}>
              <UserIcon size={30} className="user-profile-icon" />
            </div>
            <Link to="/cart">
              <div className="navbar__icon-wrapper__cart-icon">
                <CartIcon className="cart-icon" size={30} />
                {cart.totalItems && (
                  <span className="cart-item-count">{cart.totalItems}</span>
                )}
              </div>
            </Link>
          </div>

          <div
            className="navbar__hamburger-icons"
            onClick={() => setExtendNavbar(!extendNavbar)}>
            {extendNavbar ? (
              <HamburgerClose className="hamburger-icon" />
            ) : (
              <Hamburger className="hamburger-icon" />
            )}
          </div>
        </NavbarContainer>
      </NavbarWrapper>

      {extendNavbar && (
        <ExtendedNavbarContainer>
          <ul className="navbar__menu">
            {links.map((link, index) => (
              <li className="navbar__menu-item" key={index}>
                <Link
                  className={classNames("navbar__menu-item-link", {
                    "navbar__menu-item-link-active-page":
                      link.route === location.pathname,
                  })}
                  to={link.route}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </ExtendedNavbarContainer>
      )}

      {extendUserProfile && (
        <ExtendedUserProfileWrapper>
          <UserProfile logoutHandler={logoutHandler} />
        </ExtendedUserProfileWrapper>
      )}
    </>
  );
};

export default Navbar;
