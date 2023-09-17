import React from "react"
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип Место" />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;

