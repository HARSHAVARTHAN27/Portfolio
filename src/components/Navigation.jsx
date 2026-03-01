import logoImg from '../images/Gemini_Generated_Image_cpsaupcpsaupcpsa.png';

export function Navigation({ isDark, onThemeToggle, onPlaySnake }) {
  return (
    <nav>
      <div className="nav-logo">
        <img src={logoImg} alt="Logo" className="logo-img" />
      </div>
      <ul className="nav-links">
        {["About", "Work", "Experience", "Contact"].map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}>{l}</a>
          </li>
        ))}
      </ul>
      <button
        onClick={onPlaySnake}
        className="snake-btn"
        title="Play Snake Game"
        onMouseOver={e => { e.target.style.background = "var(--accent)"; e.target.style.color = "var(--bg)"; }}
        onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--accent)"; }}
      >
        🐍 Snake
      </button>
      <button
        onClick={onThemeToggle}
        className="theme-toggle"
        onMouseOver={e => { e.target.style.background = "var(--accent)"; e.target.style.color = "var(--bg)"; }}
        onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--accent)"; }}
      >
        {isDark ? "☀ Light" : "☾ Dark"}
      </button>
    </nav>
  );
}
