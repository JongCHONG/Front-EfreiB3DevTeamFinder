import React from "react";
import { Link } from "react-router-dom";

import ButtonNavigateStyles from "./ButtonNavigate.module.scss";

const ButtonNavigate = ({ text, link }) => {
  return (
    <Link to={link} className={ButtonNavigateStyles.buttonNavigate}>
      {text}
    </Link>
  );
};

export default ButtonNavigate;
