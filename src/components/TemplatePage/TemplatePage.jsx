import React from "react";

import Footer from "../Footer/Footer";

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
        <Footer />
      </section>
    </>
  );
};

export default TemplatePage;
