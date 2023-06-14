import React from "react";

import ButtonStyle from "./Button.module.scss";

const Button = (props) => {
  const { text } = props;
  return (
    <button type="submit" className={ButtonStyle.button}>
      {text}
    </button>
  );
};

export default Button;
