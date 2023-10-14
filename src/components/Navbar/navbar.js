import styled, { keyframes } from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const extendedNavbarAnimation = keyframes`
 0% { height: 0 }
 100% { height: 100vh;  }
 `;

export const NavbarWrapper = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${ColorsUsed.navBackground};
  padding: 12px 100px;
  font-size: 20px;
`;

export const NavbarContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 1fr;
  align-items: center;

  .navbar {
    &__logo {
      font-size: 1.5rem;
      color: #edf0f1;
      text-decoration: none;
      display: flex;
      gap: 10px;
      font-weight: 500;
    }
    &__menu {
      display: grid;
      padding: 10px 0;
      grid-template-columns: repeat(3, 1fr);
      justify-items: center;
      list-style-type: none;
      @media (max-width: 768px) {
        display: none;
      }
      &-item {
        margin-left: 10px;
      }
      &-link {
        color: #edf0f1;
        text-decoration: none;
      }
      &-active-page-link {
        color: #edf0f1;
        text-decoration: none;
        border-bottom: 4px solid ${ColorsUsed.navButtonBackground};
      }
    }
    &__icon-wrapper {
      justify-self: end;
      display: flex;
      align-items: center;
      align-self: center;
      gap: 50px;
      cursor: pointer;
      border-radius: 5px;
      background-color: ${ColorsUsed.navBackground};
      &__user-profile-icon {
        justify-self: end;
        border-radius: 5px;
        background-color: ${ColorsUsed.navBackground};
        .user-profile-icon {
          color: white;
        }
        .user-profile-icon:hover {
          color: ${ColorsUsed.navButtonBackground};
        }
      }
      &__cart-icon {
        display: flex;
        .cart-icon {
          color: white;
          align-self: center;
        }
        .cart-icon:hover {
          color: ${ColorsUsed.navButtonBackground};
        }
        .cart-item-count {
          background-color: ${ColorsUsed.navButtonBackground};
          position: relative;
          padding: 5px;
          bottom: 15px;
          border: 1px solid white;
          border-radius: 100%;
          color: white;
          font-size: 16px;
        }
      }
    }

    &__hamburger-icons {
      display: grid;
      justify-items: end;
      .hamburger-icon {
        width: 30px;
        height: 30px;
        color: ${ColorsUsed.navTextColor};
        cursor: pointer;
        @media (min-width: 768px) {
          display: none;
        }
      }
    }
  }
`;

export const ExtendedNavbarContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 56px; //issue here
  background-color: ${ColorsUsed.navBackground};
  animation: ${extendedNavbarAnimation} 0.5s;
  font-size: 20px;
  .navbar {
    &__menu {
      display: grid;
      justify-items: center;
      row-gap: 50%;
      padding: 50%;
      &-item {
        list-style-type: none;
        &-link {
          text-decoration: none;
          color: ${ColorsUsed.navTextColor};
        }
        &-link-active-page {
          color: ${ColorsUsed.navTextColor};
          text-decoration: none;
          border-bottom: 4px solid ${ColorsUsed.navButtonBackground};
        }
      }
    }
  }
`;
export const ExtendedUserProfileWrapper = styled.div`
  display: block;
  z-index: 999;
  width: 200px;
  position: absolute;
  top: 100px;
  right: 100px;
  background-color: white;
`;
