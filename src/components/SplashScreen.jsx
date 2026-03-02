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
      <div className="splash-content">
        <h1>Welcome</h1>
        <p>Loading your portfolio...</p>
      </div>
    </div>
  );
}
