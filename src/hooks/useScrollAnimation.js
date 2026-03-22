import { useEffect } from "react";

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            // If we want it to hide when out of view
            e.target.classList.remove("visible");
          }
        }),
      { threshold: 0, rootMargin: "-50px 0px" },
    );
    // Timeout ensures all React elements have rendered before querying DOM
    setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);
};
