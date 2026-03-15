import { useState } from 'react';
import { User, Briefcase, Star, Mail, Sun, Moon, Code2 } from 'lucide-react';
import profileDark from '../images/Gemini_Generated_Image_l3le4hl3le4hl3le (1).png';
import profileLight from '../images/Gemini_Generated_Image_cpsaupcpsaupcpsa.png';
import { ThemeSwitch } from './ThemeSwitch';

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

  const navItems = [
    { name: 'About', icon: User, href: '#about' },
    { name: 'Work', icon: Briefcase, href: '#work' },
    { name: 'Experience', icon: Star, href: '#experience' },
    { name: 'Skills', icon: Code2, href: '#skills' },
    { name: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <>
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      ></div>
      <nav>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li className="menu-close-btn-wrapper">
          <button className="menu-close-btn" onClick={closeMenu} aria-label="Close menu" title="Close menu">
            ✕
          </button>
        </li>
        
        <li className="mobile-profile mobile-only-flex">
          <div className="profile-avatar">
            <img src={isDark ? profileDark : profileLight} alt="Profile" />
          </div>
          <div className="profile-info">
            <span className="profile-name">Harshavardhan</span>
            <span className="profile-title">Web Developer</span>
          </div>
        </li>

        <li className="mobile-divider mobile-only"></li>

        <div className="nav-links-main">
          {navItems.map(item => (
            <li key={item.name}>
              <a href={item.href} onClick={closeMenu} className="nav-item-link">
                <item.icon className="nav-icon" size={20} />
                <span className="nav-text">{item.name}</span>
              </a>
            </li>
          ))}
        </div>

        <div className="nav-links-bottom mobile-only">
          <li className="mobile-divider mobile-only"></li>

          <li key="theme-toggle" className="mobile-only">
            <a href="#" onClick={(e) => { e.preventDefault(); onThemeToggle(); }} className="nav-item-link">
              {isDark ? <Sun className="nav-icon" size={20} /> : <Moon className="nav-icon" size={20} />}
              <span className="nav-text">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </a>
          </li>

          <li key="snake-game" className="mobile-only">
            <a href="#" onClick={(e) => { e.preventDefault(); handleSnakeClick(); }} className="nav-item-link">
              <span className="snake-btn" style={{ position: 'relative', display: 'inline-flex', marginRight: '16px' }}>🐍</span>
              <span className="nav-text">Play Snake</span>
            </a>
          </li>
        </div>
      </ul>

      <div className="nav-controls">
        <button
          onClick={handleSnakeClick}
          className="snake-btn"
          title="Play Snake Game"
        >
          🐍
        </button>
        <ThemeSwitch isDark={isDark} onThemeToggle={onThemeToggle} />
      </div>

      <button className="nav-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </button>
      </nav>
    </>
  );
}
