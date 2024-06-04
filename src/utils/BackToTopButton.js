import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  // Show the button when scrolled down 100 pixels
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 z-50 right-5 p-3 transition bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          ↑ Top
        </button>
      )}
    </>
  );
}
