import { useState } from "react";
import { User, Briefcase, Mail, Code2 } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((o) => !o);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: "About", icon: User, href: "#about" },
    { name: "Work", icon: Briefcase, href: "#work" },
    { name: "Skills", icon: Code2, href: "#skills" },
    { name: "Contact", icon: Mail, href: "#contact" },
  ];

  return (
    <>
      <div
        className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li className="menu-close-btn-wrapper">
            <button
              className="menu-close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </li>

          <div className="nav-links-main">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="nav-item-link"
                >
                  <item.icon className="nav-icon" size={20} />
                  <span className="nav-text">{item.name}</span>
                </a>
              </li>
            ))}
          </div>
        </ul>

        {/* No controls on desktop — just the hamburger on mobile */}
        <button
          className="nav-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </nav>
    </>
  );
}
