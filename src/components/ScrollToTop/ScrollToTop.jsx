import React, { useState } from 'react';

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
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      Scroll to Top
    </button>
  );
};

export default ScrollToTopButton;
