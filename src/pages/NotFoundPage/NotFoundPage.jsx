import React from "react";

import TemplatePage from "../../components/TemplatePage/TemplatePage";

import NotFoundPageStyles from "./NotFoundPage.module.scss";
const NotFoundPage = () => {
  return (
    <TemplatePage>
      <div className={NotFoundPageStyles.middle}>
        <div className={NotFoundPageStyles.container}>Page non disponible</div>
      </div>
    </TemplatePage>
  );
};

export default NotFoundPage;
