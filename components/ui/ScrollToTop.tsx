"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-primary text-white hover:bg-primary/90 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-12 h-12 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <Icon icon="material-symbols:keyboard-arrow-up" width={20} height={20} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;