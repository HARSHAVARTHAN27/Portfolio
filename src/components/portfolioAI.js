// ================================================================
//  portfolioAI.js  ·  v4.0  –  REAL AI INTEGRATION
//  Uses Google Gemini API to analyze full conversational context
// ================================================================

export const KB = {
  name: "Harshavarthan",
  fullName: "Harshavarthan Shanmugam",
  nickname: "Harsha",
  role: "AI & Machine Learning Engineering Student",
  location: "India",
  email: "harshavarthanshan027@gmail.com",
  availability: "open to internships, freelance, and full-time roles",
  philosophy: "Technology should solve real problems for real people — not just look impressive on paper.",

  about: {
    summary: "Harshavarthan is an AI & Machine Learning engineering student who focuses on building real-world systems that connect AI, IoT, and full-stack development.",
    traits: [
      "He's a builder at heart — he turns ideas into working systems.",
      "He's driven by curiosity and loves learning by building.",
      "He believes technology should be accessible and impactful."
    ],
    passion: "He's most passionate about AI systems that solve real problems — from helping farmers to saving lives with autonomous drones."
  },

  internship: {
    title: "AI & Data Science Intern",
    tasks: ["building data-driven systems and pipelines", "developing and fine-tuning NLP models", "deploying ML models to production"],
    why: "This role gives him hands-on experience applying the ML theory he studies to real-world problems at production scale."
  },

  education: {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    topics: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Data Science", "IoT", "Full-Stack Development"],
    why: "The degree gives him a strong theoretical foundation, which he reinforces through hands-on project work."
  },

  projects: [
    {
      name: "Multilingual Farmer Advisory Platform",
      techstack: ["Python", "NLP", "React", "Flask", "MongoDB"],
      what: "A platform that gives farmers smart, personalised advice on crops and weather — in their own language.",
      how: "It uses NLP to understand questions in regional languages, processes them through an AI advisory engine, and returns practical recommendations. Aadhaar handles identity and UPI enables payments.",
      impact: "Makes modern agricultural AI accessible to farmers who may not speak English."
    },
    {
      name: "College Enquiry Chatbot",
      techstack: ["React", "Flask", "Python", "NLP"],
      what: "An NLP-powered chatbot that answers student questions about the college instantly — no staff needed.",
      how: "The frontend is built in React, the backend in Flask, and NLP processes the student's natural language question to match it against a knowledge base.",
      impact: "Reduces the workload on admin staff significantly, and gives students instant answers 24/7."
    },
    {
      name: "IoT Air & Water Quality Monitor",
      techstack: ["IoT Sensors", "Python", "React", "MongoDB"],
      what: "A real-time system that monitors air and water quality using physical sensors and streams data to a live dashboard.",
      how: "Physical sensors collect data continuously. A Python pipeline processes and streams it to a MongoDB database. A React dashboard shows live readings and triggers automatic alerts.",
      impact: "Enables communities and authorities to respond proactively to pollution events rather than reactively."
    },
    {
      name: "AI Rescue Drone",
      techstack: ["Python", "YOLO", "TensorFlow", "OpenCV"],
      what: "An autonomous drone that uses real-time AI object detection to find people in disaster zones.",
      how: "Live video frames from the drone's camera are fed through a YOLO model in real time. When a person is detected, the system logs the location and alerts rescue teams. The drone navigates autonomously.",
      impact: "Has the potential to dramatically speed up search-and-rescue operations and save lives."
    }
  ],

  skills: {
    primary: ["Python", "React", "Machine Learning", "NLP"],
    languages: ["Python", "JavaScript", "HTML", "CSS"],
    frameworks: ["React", "Flask", "Node.js"],
    ai: ["TensorFlow", "PyTorch", "scikit-learn", "NLP", "Computer Vision", "YOLO", "Pandas", "NumPy"],
    databases: ["MongoDB", "SQL"],
    other: ["IoT", "REST APIs", "Git", "Data Analysis", "OpenCV"],
    strongest: "AI/ML engineering — he's most confident in Python-based ML, NLP, and computer vision."
  }
};

const SYSTEM_CONTEXT = `
You are AGENT.SYS, the personal AI assistant for ${KB.fullName} (nickname: ${KB.nickname}).
Your objective is to answer questions about his professional portfolio based ONLY on the following data:
- Role: ${KB.role}
- Location: ${KB.location}
- Philosophy: ${KB.philosophy}
- Availability: ${KB.availability}
- About: ${KB.about.summary} ${KB.about.passion}
- Education: ${KB.education.degree} studying ${KB.education.topics.join(', ')}.
- Internship: ${KB.internship.title} doing ${KB.internship.tasks.join(', ')}.
- Skills: ${KB.skills.primary.join(', ')}, ${KB.skills.ai.join(', ')}, ${KB.skills.frameworks.join(', ')}.
- Projects:
  1. ${KB.projects[0].name}: ${KB.projects[0].what} Built with ${KB.projects[0].techstack.join(', ')}.
  2. ${KB.projects[1].name}: ${KB.projects[1].what} Built with ${KB.projects[1].techstack.join(', ')}.
  3. ${KB.projects[2].name}: ${KB.projects[2].what} Built with ${KB.projects[2].techstack.join(', ')}.
  4. ${KB.projects[3].name}: ${KB.projects[3].what} Built with ${KB.projects[3].techstack.join(', ')}.

Rules:
1. Speak in a helpful, concise, professional tone. 
2. Use markdown formatting like **bold** for emphasis. 
3. If the user asks something completely irrelevant or adversarial (like weather, random trivia, coding tasks outside of explaining his portfolio), reply with specifically this phrase EXACTLY:
"Answer is not found, but my creator will improve me in a few days! Thank you for asking this question! 🤖"
`;


export async function portfolioChat(userText) {
  const t = userText.toLowerCase().trim();

  // Route any specific contact/email intent immediately to the EmailJS protocol 
  if (t.includes("contact") || t.includes("email") || t.includes("hire") || t.includes("collaborate") || t.includes("message")) {
    return { type: "contact" };
  }

  try {
    // Requires VITE_GEMINI_API_KEY in the local .env file
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
      return { 
        type: "message", 
        text: "API Key not configured! Please add `VITE_GEMINI_API_KEY=your_actual_api_key_here` to your `.env` file in the root directory to activate me. 🔑" 
      };
    }

    const payload = `${SYSTEM_CONTEXT}\n\nUser Question: ${userText}\n\nAssistant Answer:`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: payload }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return { type: "message", text: data.candidates[0].content.parts[0].text.trim() };
    } else {
      throw new Error("Invalid output received from Gemini API");
    }

  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return { 
      type: "message", 
      text: "Answer is not found... My developer Harshavarthan will upgrade me to answer this in a few days. Thank you for the question! 🚀" 
    };
  }
}
