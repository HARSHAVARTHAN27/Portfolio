import { useState, useRef, useEffect } from 'react';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hey! 👋 I'm an AI assistant. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMsg = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great question! I'd love to help.",
        "Interesting! Tell me more about that.",
        "I agree! Let me know how I can assist.",
        "That sounds amazing! I'm here to help.",
        "I'd be happy to help you with that!",
        "Great thinking! Here's what I have to say...",
        "I love your enthusiasm! Let's discuss.",
        "Perfect! I'm always excited to collaborate."
      ];

      const randomBot = botResponses[Math.floor(Math.random() * botResponses.length)];

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: randomBot,
        sender: 'bot',
        timestamp: new Date()
      }]);

      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <span>{isOpen ? '✕' : '💬'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <h3 className="chat-title">AI Assistant</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.sender}-message`}
              >
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message bot-message">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} className="chat-input-form">
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-button"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
