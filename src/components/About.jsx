import { skills } from '../data/skills';
import profileDark from '../images/Gemini_Generated_Image_l3le4hl3le4hl3le (1).png';
// fallback/light mode variant
import profileLight from '../images/Gemini_Generated_Image_cpsaupcpsaupcpsa.png';

export function About({ isDark = true }) {
  return (
    <section className="section" id="about">
      <div className="about-container">
        {/* LEFT SIDE - Image and Title */}
        <div className="about-left reveal">
          <div className="photo-frame">
            <div className="photo-inner">
              <img 
                src={isDark ? profileDark : profileLight}
                alt="Profile"
              />
            </div>
          </div>
          <div className="about-hero-title">
            <span className="title-line">ENGINEER.</span>
            <span className="title-line highlight-line">BUILDER.</span>
            <span className="title-line">CREATOR</span>
          </div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="about-right">
          <div className="reveal">
            <p className="about-text">
              I’m an <strong>Artificial Intelligence and Machine Learning engineering student</strong> focused on building real-world systems that actually solve problems — not just academic projects. My work sits at the intersection of AI, IoT, and full-stack development, where I design and develop intelligent applications across domains like healthcare, environmental monitoring, and automation.
            </p>
          </div>

          <div className="reveal">
            <p className="about-text">
              I’ve built projects such as a multilingual farmer advisory platform with Aadhaar authentication and UPI integration, a college enquiry chatbot using React and Flask, and an IoT-based air and water quality monitoring system with real-time sensor data. I’ve also explored advanced applications like an AI-powered rescue drone with object detection and a carbon footprint tracking platform. Through these, I’ve developed strong hands-on skills in Python, React, MongoDB, and applied machine learning.
            </p>
          </div>

          <div className="reveal">
            <p className="about-text">
              Currently, I’m working as an <strong>AI & Data Science Intern</strong>, gaining real-world experience in building data-driven systems and solving practical problems. I’m driven by the goal of becoming an AI engineer who builds scalable, impactful solutions — not average ones. I’m constantly learning, experimenting, and pushing my limits to create systems that stand out in both innovation and execution.
            </p>
          </div>

          <div className="reveal">
            <div className="stats-block">
              {[
                { num: "5+", label: "PROJECTS BUILT" },
                { num: "2+", label: "INTERNSHIPS" },
                { num: "4+", label: "TECH STACKS" },
                { num: "∞", label: "LEARNING & BUILDING" }
              ].map(s => (
                <div className="stat-box" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="skills-row">
              {skills.map(s => (
                <div className="skill-pill" key={s}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
