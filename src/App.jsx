import { useState, useRef } from 'react';
import './App.css';
import './styles/global.css';
import './components/Navigation.css';
import './components/Hero.css';
import './components/About.css';
import './components/Projects.css';
import './components/Experience.css';
import './components/Contact.css';
import './components/Footer.css';
import './components/ChatBot.css';
import './components/SplashScreen.css'; // Import splash screen CSS
import './components/SnakeGame/SnakeGame.css'; // Import snake game CSS
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { SplashScreen } from './components/SplashScreen'; // Import SplashScreen component
import { SnakeGame } from './components/SnakeGame/SnakeGame'; // Import SnakeGame component
import { useCursor } from './hooks/useCursor';
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function App() {
  console.log('App render');
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [isDark, setIsDark] = useState(true);
  const [showSplash, setShowSplash] = useState(true); // State for splash screen
  const [showSnakeGame, setShowSnakeGame] = useState(false); // State for snake game modal

  useCursor(cursorRef, trailRef);
  useScrollAnimation();

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light', isDark);
  };

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handlePlaySnake = () => {
    setShowSnakeGame(!showSnakeGame);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />

      <Navigation isDark={isDark} onThemeToggle={handleThemeToggle} onPlaySnake={handlePlaySnake} />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <ChatBot />
      
      {/* Snake Game Modal */}
      {showSnakeGame && (
        <div className="snake-game-modal" onClick={() => setShowSnakeGame(false)}>
          <div className="snake-game-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-snake-btn" onClick={() => setShowSnakeGame(false)}>✕</button>
            <SnakeGame />
          </div>
        </div>
      )}
    </>
  );
}
