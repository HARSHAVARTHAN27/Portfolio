import { useState } from "react";
import { projects } from "../data/projects";
import { X, ExternalLink, ArrowUpRight, Zap, Hash, Cpu, Layers } from "lucide-react";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflowY = "hidden"; // Prevent vertical scrolling safely
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflowY = ""; // Revert to global CSS rules
  };

  return (
    <section className="section projects-section" id="work">
      <div className="section-label reveal">02 — Selected Work</div>
      
      <div className="bento-out-grid">
        {projects.map((p, i) => (
          <div
            className="bento-card reveal"
            key={i}
            onClick={() => openModal(p)}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <img src={p.image} className="bento-bg" alt={p.title} />
            <div className="bento-overlay">
              <div className="bento-tag">{p.tags[0]}</div>
              <div className="bento-content">
                <h3 className="bento-title">{p.title}</h3>
                <p className="bento-subtitle">{p.subtitle}</p>
                <div className="bento-action">
                  <span>VIEW CASE</span>
                  <div className="bento-icon-btn">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="bento-modal-backdrop" onClick={closeModal}>
          <div className="bento-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header Section over Image */}
            <div className="modal-hero">
              <img src={selectedProject.image} className="modal-hero-bg" alt="hero" />
              <button className="modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
              
              <div className="modal-hero-content">
                <div className="hero-top">
                  <div className="hero-badge">
                    <span className="badge-highlight">PROJECT CASE FILE</span>
                    <span className="badge-id">ID: {selectedProject.shortTitle.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="hero-bottom">
                  <div className="hero-titles">
                    <h2>{selectedProject.title}</h2>
                    <p>{selectedProject.desc}</p>
                  </div>
                  <a href={selectedProject.link} className="launch-btn" target="_blank" rel="noopener noreferrer">
                    <Zap size={16} /> LAUNCH PROJECT <ExternalLink size={14} style={{ marginLeft: "6px" }} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bento Grids inside Modal */}
            <div className="modal-inner-grid">
              <div className="modal-grid-box">
                <div className="box-header">
                  <Hash size={14} className="box-icon color-red" /> CHALLENGE
                </div>
                <p className="box-text">{selectedProject.challenge}</p>
              </div>

              <div className="modal-grid-box">
                <div className="box-header">
                  <Cpu size={14} className="box-icon color-green" /> RESOLUTION
                </div>
                <p className="box-text">{selectedProject.resolution}</p>
              </div>

              <div className="modal-grid-box">
                <div className="box-header">
                  <Layers size={14} className="box-icon color-blue" /> TECH STACK
                </div>
                <div className="tech-tags">
                  {selectedProject.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="modal-grid-box wide">
                <div className="box-header" style={{ color: "var(--text)", textTransform: "none", fontSize: "16px", marginTop: "10px" }}>
                  Architectural Details
                </div>
                <p className="box-text" style={{ fontSize: "13px", marginTop: "16px", paddingRight: "20px" }}>
                  A scalable, privacy-focused application engineered for maximum reliability. Built to ensure that data transfer is secure continuously, effectively managing backend workloads while providing a frictionless frontend experience.
                </p>
              </div>

              <div className="modal-grid-box">
                <div className="box-small-label">MY ROLE</div>
                <p className="box-strong">{selectedProject.role}</p>

                <div className="box-small-label" style={{ marginTop: "32px" }}>CATEGORY</div>
                <p className="box-strong">{selectedProject.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
