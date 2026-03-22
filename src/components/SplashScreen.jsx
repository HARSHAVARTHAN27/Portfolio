import React, { useEffect, useState } from "react";

export function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 3500);
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 4300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isFading ? "fade-out" : ""}`}>
      <div className="splash-center">
        <h1 className="splash-name">HARSHAVARTHAN</h1>
        <div className="splash-line-box">
          <div className="splash-line-fill"></div>
        </div>
        <p className="splash-sub">PORTFOLIO</p>
      </div>
    </div>
  );
}
