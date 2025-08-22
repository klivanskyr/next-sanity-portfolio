"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BringToTop() {
  const [visible, setVisible] = useState(false);

  function bringToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledPercent = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setVisible(scrolledPercent > 0.25);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial state
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="bring-to-top-button"
      onClick={bringToTop}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s"
      }}
      className="fixed bottom-4 right-4 w-10 h-10 p-2 bg-white rounded-full text-black cursor-pointer hover:shadow-lg transition-opacity opacity-50 hover:opacity-100"
    >
      <ChevronUp />
    </button>
  );
}