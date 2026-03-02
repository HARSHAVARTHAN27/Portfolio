import React, { useEffect, useState } from 'react';

export function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) {
        onFinish();
      }
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="splash-screen">
      <div className="splash-3d-scene" aria-hidden>
        {/* Central glowing orb */}
        <div className="orb-core" />
        
        {/* Rotating rings at different angles and speeds */}
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        
        {/* Floating particles */}
        <div className="particle p1" />
        <div className="particle p2" />
        <div className="particle p3" />
        <div className="particle p4" />
        <div className="particle p5" />
      </div>
      <div className="splash-content">
        <h1>Welcome</h1>
        <p>Loading your portfolio...</p>
      </div>
    </div>
  );
}
