import { useState } from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export function Hero() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadCV = () => {
    setDownloading(true);

    const link = document.createElement('a');
    link.href = '/resume%203.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = 'Harshavarthan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(false), 800);
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" />
      <div className="glow-orb" style={{ width: 600, height: 600, background: "var(--accent)", top: -200, right: -200 }} />
      <div className="glow-orb" style={{ width: 400, height: 400, background: "var(--accent2)", bottom: 0, left: -100 }} />

      <div className="hero-tag reveal">Available for opportunities</div>
      
      <div className="hero-name reveal">
        <span className="line1">HARSHA</span>
        <span className="line2">VARTHAN</span>
      </div>

      <div className="hero-vertical">
        {"BUILD CODE SOLVE REPEAT".split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>

      <p className="hero-desc reveal">
        AI/ML engineer building real-world applications that combine intelligence with practical impact. I focus on creating systems that actually solve problems.
      </p>

      <div className="hero-cta reveal">
        <a href="#work" className="btn-primary">View My Work</a>
        <a href="#contact" className="btn-outline">Let's Talk</a>
        <button onClick={handleDownloadCV} className="btn-outline" disabled={downloading}>
          {downloading ? "Downloading..." : "Download CV"}
        </button>
      </div>

      {/* Social Media Links */}
      <div className="hero-social reveal">
        <a href="https://github.com/HARSHAVARTHAN27" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/harshavarthan-s-31662b252/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="https://www.instagram.com/harshavarthan_official_/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
          <Instagram size={20} />
        </a>
        <a href="mailto:your@email.com" className="social-btn" aria-label="Email">
          <Mail size={20} />
        </a>
      </div>

      <div className="measure-lines">
        {[
          { h: 60, label: "20cm" },
          { h: 40, label: "5cm" },
          { h: 80, label: "25cm" },
          { h: 30, label: "2cm" },
          { h: 55, label: "18cm" }
        ].map((m, i) => (
          <div className="measure-line" key={i} style={{ marginRight: 16 }}>
            <div className="tick" style={{ height: m.h }} />
            <span className="measure-label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
