import React from "react";
import { Link } from "react-router-dom";

import MenuStyles from "./Menu.module.scss";
import Logo from "../../assets/images/logo-teamfinder.png";

const Menu = () => {
  return (
    <nav className={MenuStyles.container}>
      <img src={Logo} className={MenuStyles.logo} alt="logo" />
      <div className={MenuStyles.nav}>
        <Link to="/signup">Inscription</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </nav>
  );
};

export default Menu;
