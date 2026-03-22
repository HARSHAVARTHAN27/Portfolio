import { useRef } from "react";
import "./App.css";
import "./styles/global.css";
import "./components/Navigation.css";
import "./components/Hero.css";
import "./components/About.css";
import "./components/Projects.css";
import "./components/Skills.css";
import "./components/Contact.css";
import "./components/ChatBot.css";
import "./components/SplashScreen.css";
import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { ChatBot } from "./components/ChatBot";
import { SplashScreen } from "./components/SplashScreen";
import { useCursor } from "./hooks/useCursor";
import { useScrollAnimation } from "./hooks/useScrollAnimation";

export default function App() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);

  useCursor(cursorRef, trailRef);
  useScrollAnimation();

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />

      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ChatBot />
    </>
  );
}
