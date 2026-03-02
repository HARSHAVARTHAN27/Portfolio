import { useState } from 'react';

export function Navigation({ isDark, onThemeToggle, onPlaySnake }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSnakeClick = () => {
    onPlaySnake();
    closeMenu();
  };

  return (
    <>
      <nav>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        {["About", "Work", "Experience", "Contact"].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={closeMenu}>{l}</a>
          </li>
        ))}
        {/* mobile-only container for buttons */}
        <li className="nav-buttons-container">
          <div className="nav-buttons">
            <button
              onClick={handleSnakeClick}
              className="snake-btn"
              title="Play Snake Game"
              onMouseOver={e => { e.target.style.background = "var(--accent)"; e.target.style.color = "var(--bg)"; }}
              onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--accent)"; }}
            >
              🐍
            </button>
            <div className="theme-pill-wrapper">
              <button
                className={`theme-pill ${isDark ? 'light' : 'dark'}`}
                onClick={onThemeToggle}
                aria-pressed={isDark}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <span className="pill-knob">{isDark ? '☀' : '☾'}</span>
              </button>
              <span className="theme-label desktop-only">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </div>
        </li>
      </ul>

      {/* desktop controls group (hidden on mobile) */}
      <div className="nav-controls">
        <button
          onClick={handleSnakeClick}
          className="snake-btn"
          title="Play Snake Game"
          onMouseOver={e => { e.target.style.background = "var(--accent)"; e.target.style.color = "var(--bg)"; }}
          onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--accent)"; }}
        >
          🐍
        </button>
        <div className="theme-pill-wrapper">
          <button
            className={`theme-pill ${isDark ? 'light' : 'dark'}`}
            onClick={onThemeToggle}
            aria-pressed={isDark}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span className="pill-knob">{isDark ? '☀' : '☾'}</span>
          </button>
          <span className="theme-label desktop-only">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
      </div>

      <button className="nav-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>
      </nav>

      {/* removed floating button and separate wrapper; theme pill is inside nav-buttons */}
    </>
  );
}
