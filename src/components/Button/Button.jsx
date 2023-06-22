import React from "react";
import ButtonStyle from "./Button.module.scss";

const Button = (props) => {
  const { text, onClick } = props;

  return (
    <button type="submit" className={ButtonStyle.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
