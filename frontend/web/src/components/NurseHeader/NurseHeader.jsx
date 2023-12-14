import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "src/assets/logo.svg";

import "./NurseHeader.css";

export default function NurseHeader() {
  return (
    <header className="header">
      <img className="header__img" src={Logo} alt="" />
      <FaBars className="header__bars" />
    </header>
  );
}
