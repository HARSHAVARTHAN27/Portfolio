import { projects } from '../data/projects';

export function Projects() {
  return (
    <section className="section projects-section" id="work">
      <div className="section-label reveal">02 — Selected Work</div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div 
            className="project-card reveal" 
            key={i} 
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="project-num">{p.num}</div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map(t => (
                <span className="project-tag" key={t}>{t}</span>
              ))}
            </div>
            <span className="project-arrow">↗</span>
          </div>
        ))}
      </div>
    </section>
  );
}
