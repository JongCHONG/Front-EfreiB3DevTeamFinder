import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import ScrollToTopStyles from "./ScrollToTop.module.scss";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldShowButton = scrollTop > 100; // Adjust this value based on when you want the button to appear
    setIsVisible(shouldShowButton);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    {isVisible && (
      <FontAwesomeIcon
        icon={faArrowUp}
        onClick={scrollToTop}
        className={ScrollToTopStyles.buttonStyle}
      />
    )}
  </>
  );
};

export default ScrollToTopButton;
