import React from "react";

import Menu from "../Menu/Menu";
import ScrollToTopButton from "../ScrollToTop/ScrollToTop";

const TemplatePage = ({ children }) => {
  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className="middle">{children}</section>
      <section className="bottom">
        <ScrollToTopButton />
      </section>
    </>
  );
};

export default TemplatePage;
