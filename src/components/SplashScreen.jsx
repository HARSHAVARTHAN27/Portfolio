import React, { useEffect, useState } from 'react';


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
    <div className={`splash-screen ${isFading ? 'fade-out' : ''}`}>
      {/* 3D Box Loader */}
      <div className="loader-wrapper">
        <div className="loader">
          <div className="box box0"><div /></div>
          <div className="box box1"><div /></div>
          <div className="box box2"><div /></div>
          <div className="box box3"><div /></div>
          <div className="box box4"><div /></div>
          <div className="box box5"><div /></div>
          <div className="box box6"><div /></div>
          <div className="box box7"><div /></div>
          <div className="ground"><div /></div>
        </div>
      </div>

      {/* Loading bar footer */}
      <div className="splash-footer">
        <div className="splash-bar-wrap">
          <div className="splash-bar-fill"></div>
        </div>
        <p className="splash-status">LOADING PORTFOLIO EXPERIENCE</p>
      </div>
    </div>
  );
}
