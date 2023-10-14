import React from "react";
import Navbar from "../Navbar";
import { LINKS } from "../../constants/Routes";

function Layout({ children }) {
  return (
    <>
      <Navbar links={LINKS} />
      {children}
    </>
  );
}

export default Layout;
