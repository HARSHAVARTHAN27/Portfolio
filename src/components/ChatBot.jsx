import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { portfolioChat, KB } from "./portfolioAI";
import { Bot, BrainCircuit, X, Send, Sparkles, Terminal } from "lucide-react";

// Render text with **bold**, bullet lines, and newlines
function RichText({ text }) {
  return (
    <span style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
      {text.split("\n").map((line, li) => {
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={li}>
            {parts.map((part, pi) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={pi} style={{ color: "var(--accent)" }}>{part.slice(2, -2)}</strong>
              ) : (
                part
              ),
            )}
            {li < text.split("\n").length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}

// Typing animation — streams text one character at a time
function TypedMessage({ text, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      idx.current += 2; // 2 chars per tick for speed
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 12);
    return () => clearInterval(interval);
  }, [text, done, onDone]);

  return <RichText text={done ? text : displayed} />;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `System initialized. Welcome to the **${KB.name}** interactive terminal.\nAsk me about projects, skills, architectures, or how to get in contact.`,
      sender: "bot",
      typed: true, 
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingEmail, setAwaitingEmail] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen, showChips]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const markTyped = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, typed: true } : m)),
    );
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text,
        sender: "bot",
        typed: false,
        timestamp: new Date(),
      },
    ]);
  };

  const handleEmailSend = async (msgText) => {
    setAwaitingEmail(false);
    try {
      await emailjs.send(
        "service_lop5e19",
        "template_vc5sssm",
        {
          from_name: "Portfolio AI Terminal",
          reply_to: "no-reply@portfolio.com",
          message: msgText,
          to_email: KB.email,
        },
        "Q3cjOkJvUA8O-KLMH",
      );
      addBotMessage(
        `[SUCCESS] Message dynamically routed to ${KB.name}'s secure inbox. Expect a reply shortly.`,
      );
    } catch {
      addBotMessage(
        "[ERROR] SMTP connection failed. Please utilize the standard Contact section below.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const processInput = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: messages.length + 1,
      text: text.trim(),
      sender: "user",
      typed: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setShowChips(false);

    if (awaitingEmail) {
      handleEmailSend(text.trim());
      return;
    }

    try {
      const result = await portfolioChat(text.trim());

      if (result.type === "contact") {
        setAwaitingEmail(true);
        addBotMessage(
          `Comms array opened. ✉️ Input your exact message parameters and I will route them straight to ${KB.name}'s inbox automatically.`,
        );
      } else {
        addBotMessage(result.text);
      }
    } catch (e) {
      console.error(e);
      addBotMessage(
        "Network connection failed. Answer is not found, but my creator will improve me in a few days! 🤖",
      );
    } finally {
      setIsLoading(false);
      setShowChips(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processInput(inputValue);
  };

  const CHIPS = [
    { label: "🚀 Projects", query: "What projects has he built?" },
    { label: "💻 Skills", query: "What are his skills?" },
    { label: "🎓 Education", query: "Tell me about his education" },
    { label: "📩 Contact", query: "contact" },
  ];

  return (
    <>
      {/* Floating abstract button */}
      <button
        className={`chat-glass-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle AI terminal"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        {!isOpen && <span className="chat-btn-pulse" />}
      </button>

      {/* Chat Terminal Window */}
      <div className={`chat-terminal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="chat-terminal-base">
          {/* Glass Header */}
          <div className="terminal-header">
            <div className="terminal-header-left">
              <div className="terminal-icon-box">
                <BrainCircuit size={18} className="spin-slow" />
              </div>
              <div className="terminal-title-stack">
                <h3 className="terminal-title">AGENT.SYS <Sparkles size={12} style={{marginLeft: 4, color: 'var(--accent)'}}/></h3>
                <span className="terminal-status">
                  <span className="dot pulse"></span> LINK ESTABLISHED
                </span>
              </div>
            </div>
            <button className="terminal-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Wrapper */}
          <div className="terminal-messages-list">
            <div className="terminal-intro-stamp">ENCRYPTED CONNECTION ACCEPTED</div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`terminal-message ${msg.sender}-msg`}>
                {msg.sender === "bot" && (
                  <div className="msg-avatar-icon">
                    <Terminal size={14} />
                  </div>
                )}
                
                <div className="msg-bubble-content">
                  {msg.sender === "bot" && !msg.typed ? (
                    <TypedMessage
                      text={msg.text}
                      onDone={() => markTyped(msg.id)}
                    />
                  ) : (
                    <RichText text={msg.text} />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="terminal-message bot-msg">
                <div className="msg-avatar-icon">
                  <Terminal size={14} />
                </div>
                <div className="msg-bubble-content typing-wave">
                  <span className="wave-dot"></span>
                  <span className="wave-dot"></span>
                  <span className="wave-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} style={{ height: "4px" }} />
          </div>

          {/* Suggestion Control Deck */}
          {showChips && !isLoading && (
            <div className="terminal-control-deck">
              <div className="deck-track">
                {CHIPS.map((c) => (
                  <button
                    key={c.label}
                    className="deck-chip"
                    onClick={() => processInput(c.query)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Console */}
          <form onSubmit={handleSubmit} className="terminal-input-console">
            <div className="console-input-wrapper">
              <div className="console-prompt">&gt;</div>
              <input
                ref={inputRef}
                type="text"
                className="console-input-field"
                placeholder={
                  awaitingEmail
                    ? `Awaiting message parameters...`
                    : "Initialize prompt..."
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="console-exec-btn"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
