import { experiences } from '../data/experiences';

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-label reveal">03 — Experience</div>
      <div className="exp-list">
        {experiences.map((e, i) => (
          <div 
            className="exp-item reveal" 
            key={i} 
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="exp-period">{e.period}</div>
            <div>
              <div className="exp-role">{e.role}</div>
              <div className="exp-company">{e.company}</div>
              <p className="exp-desc">{e.desc}</p>
            </div>
            <div className="exp-badge">{e.badge}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
