import React from "react";

import Footer from "../Footer/Footer";

import Menu from "../Menu/Menu";
import ScrollToTopButton from "../ScrollToTop/ScrollToTop";

import TemplatePageStyles from "./TemplatePage.module.scss";

const TemplatePage = ({ children }) => {
  return (
    <>
      <section className="top">
        <Menu />
      </section>
      <section className={TemplatePageStyles.middle}>
        {children}
        <div className={TemplatePageStyles.arrow}>
          <ScrollToTopButton />
        </div>
      </section>
      <section className="bottom">
        <Footer />
      </section>
    </>
  );
};

export default TemplatePage;
