import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import MenuStyles from "./Menu.module.scss";
import Logo from "../../assets/images/logo-teamfinder.png";
import { checkUserLoggedIn, logout } from "../../utils/helpers";

const Menu = () => {
  const connectedUser = checkUserLoggedIn();
  const { setUser } = useContext(UserContext);

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <nav className={MenuStyles.container}>
      <div className={MenuStyles.logo}>
        <Link to="/">
          <img src={Logo} className={MenuStyles.img} alt="logo" />
        </Link>
      </div>
      <div className={MenuStyles.navMenu}>
        <div className={MenuStyles.navLeft}>
          <Link to="/announcements">Annonces</Link>
          <Link to="/playerslist">Recruter des joueurs</Link>
          <Link to="/teamslist">Trouver une équipe</Link>
        </div>
        {connectedUser ? (
          <div className={MenuStyles.navRight}>
            <Link to="/">{connectedUser.username}</Link>
            <span onClick={logoutUser}><Link to="/">Déconnexion</Link></span>
          </div>
        ) : (
          <div className={MenuStyles.navRight}>
            <Link to="/signup">Inscription</Link>
            <Link to="/login">Connexion</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Menu;
