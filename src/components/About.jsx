import React from "react";

const renderText = (text) => {
  return text.split(" ").map((word, index) => {
    if (!word) return null;
    return (
      <React.Fragment key={index}>
        <span className="word" style={{ transitionDelay: `${index * 0.02}s` }}>
          {word}
        </span>{" "}
      </React.Fragment>
    );
  });
};

export function About() {
  return (
    <section className="section" id="about">
      <div className="about-container">
        {/* LEFT SIDE - Title only (photo removed) */}
        <div className="about-left reveal">
          <div className="about-hero-title">
            <span className="title-line">ENGINEER.</span>
            <span className="title-line highlight-line">BUILDER.</span>
            <span className="title-line">CREATOR</span>
          </div>
          <div className="stats-block">
            {[
              { num: "5+", label: "PROJECTS BUILT" },
              { num: "2+", label: "INTERNSHIPS" },
              { num: "4+", label: "TECH STACKS" },
              { num: "∞", label: "LEARNING & BUILDING" },
            ].map((s) => (
              <div className="stat-box" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="about-right">
          <div className="reveal">
            <p className="about-text word-reveal">
              {renderText(
                "I’m an AI/ML engineer and web developer building intelligent systems that translate into real-world applications. I focus on turning ideas into practical products that people can actually use.",
              )}
            </p>
          </div>

          <div className="reveal">
            <p className="about-text word-reveal">
              {renderText(
                "My work combines machine learning with full-stack development, using technologies like React and Node.js to build scalable, efficient, and user-focused applications. I’ve developed projects like an AI-powered student chatbot for handling queries and an IoT-based air & water quality monitoring system, always aiming to solve real problems rather than just showcase concepts.",
              )}
            </p>
          </div>

          <div className="reveal">
            <p className="about-text word-reveal">
              {renderText(
                "I approach development with a strong focus on understanding how models work, how systems integrate, and how to deploy them effectively. Beyond development, I spend time exploring new technologies, testing ideas, and continuously improving my ability to design and build smarter systems.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
