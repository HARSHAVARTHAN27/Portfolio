import { skills } from '../data/skills';
import { 
  FileCode2, 
  Code2, 
  Atom, 
  Smartphone, 
  FlaskConical, 
  Database, 
  Network, 
  Brain, 
  Cpu, 
  Camera, 
  Layers, 
  Bot, 
  BarChart3, 
  Wifi, 
  Activity, 
  Coffee 
} from 'lucide-react';

const skillIcons = {
  "PYTHON": <FileCode2 className="skill-icon" size={24} />,
  "JAVASCRIPT": <Code2 className="skill-icon" size={24} />,
  "REACT": <Atom className="skill-icon" size={24} />,
  "REACT NATIVE": <Smartphone className="skill-icon" size={24} />,
  "FLASK": <FlaskConical className="skill-icon" size={24} />,
  "MONGODB": <Database className="skill-icon" size={24} />,
  "REST APIs": <Network className="skill-icon" size={24} />,
  "MACHINE LEARNING": <Brain className="skill-icon" size={24} />,
  "SCIKIT-LEARN": <Layers className="skill-icon" size={24} />,
  "OPENCV": <Camera className="skill-icon" size={24} />,
  "TENSORFLOW": <Layers className="skill-icon" size={24} />,
  "AI CHATBOTS": <Bot className="skill-icon" size={24} />,
  "DATA ANALYSIS": <BarChart3 className="skill-icon" size={24} />,
  "ESP8266": <Cpu className="skill-icon" size={24} />,
  "IOT": <Wifi className="skill-icon" size={24} />,
  "BLYNK": <Smartphone className="skill-icon" size={24} />,
  "SENSOR INTEGRATION": <Activity className="skill-icon" size={24} />,
  "JAVA": <Coffee className="skill-icon" size={24} />
};

const skillColors = {
  "PYTHON": "#3776AB",
  "JAVASCRIPT": "#F7DF1E",
  "REACT": "#61DAFB",
  "REACT NATIVE": "#61DAFB",
  "FLASK": "#FFFFFF",
  "MONGODB": "#47A248",
  "REST APIs": "#0096D6",
  "MACHINE LEARNING": "#FF6F00",
  "SCIKIT-LEARN": "#F7931E",
  "OPENCV": "#5C3EE8",
  "TENSORFLOW": "#FF6F00",
  "AI CHATBOTS": "#00E676",
  "DATA ANALYSIS": "#1E88E5",
  "ESP8266": "#E7352C",
  "IOT": "#9C27B0",
  "BLYNK": "#1DBE8E",
  "SENSOR INTEGRATION": "#FFEB3B",
  "JAVA": "#F89820"
};

export function Skills() {
  // Organize skills into rows to simulate a staggered keyboard layout
  const rows = [
    skills.slice(0, 5),   // Row 1: 5 keys
    skills.slice(5, 10),  // Row 2: 5 keys
    skills.slice(10, 14), // Row 3: 4 keys
    skills.slice(14, 18)  // Row 4: 4 keys
  ];

  return (
    <section className="section" id="skills">
      <div className="section-label reveal">04 — Skills & Expertise</div>
      <div className="skills-container wrapper">
        <div className="reveal">
          <div className="mechanical-board">
            {rows.map((row, rowIndex) => (
              <div className={`keyboard-row row-${rowIndex + 1}`} key={rowIndex}>
                {row.map((s, colIndex) => {
                  // Stagger the floating animation slightly for each key
                  const delay = (rowIndex * row.length + colIndex) * 0.1;
                  return (
                    <div 
                      className="key-wrapper" 
                      key={s}
                      style={{ 
                        animationDelay: `${delay}s`,
                        '--key-color': skillColors[s] || 'var(--accent)'
                      }}
                    >
                      <div className="keycap">
                        <div className="key-content">
                          {skillIcons[s] || <Code2 className="skill-icon" size={24} />}
                          <span className="key-text">{s}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
