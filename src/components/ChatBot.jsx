import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

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
  const [awaitingEmail, setAwaitingEmail] = useState(false);
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

    const userInput = inputValue.toLowerCase();
    const userMsg = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Handle sending message to email if we're in the email pipeline
    if (awaitingEmail) {
      setAwaitingEmail(false);
      
      // Send via EmailJS
      emailjs.send(
        'service_lop5e19', // User provided Service ID
        'template_vc5sssm', // User provided Template ID
        {
          from_name: "Portfolio Chatbot", // Sent from bot
          reply_to: "no-reply@portfolio.com", 
          message: inputValue,
          to_email: "harshavarthanshan027@gmail.com"
        },
        'Q3cjOkJvUA8O-KLMH' // User Public Key
      ).then(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "✅ I've successfully sent your message directly to Harshavardhan's inbox!",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }).catch((error) => {
        console.error('Email sending failed:', error);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Oops, something went wrong. You can also use the Contact form at the bottom of the page!",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }).finally(() => {
        setIsLoading(false);
      });
      return;
    }

    // Simulate bot response with simple keyword matching
    setTimeout(() => {
      let botResponse = "";

      if (userInput.includes("about") || userInput.includes("who are you") || userInput.includes("profile")) {
        botResponse = "I am Harshavardhan, an Artificial Intelligence and Machine Learning engineering student! I focus on building real-world systems connecting AI, IoT, and full-stack development to solve actual problems.";
      } else if (userInput.includes("experience") || userInput.includes("internship") || userInput.includes("work")) {
        botResponse = "I'm currently working as an AI & Data Science Intern! I have hands-on experience building data-driven systems, developing NLP models, and actively applying machine learning to practical scenarios.";
      } else if (userInput.includes("project") || userInput.includes("portfolio") || userInput.includes("built")) {
        botResponse = "I've built several exciting projects! Some highlights include: \n1) A multilingual farmer advisory platform with Aadhaar/UPI.\n2) A college enquiry chatbot using React and Flask.\n3) An IoT-based air/water quality monitoring system.\n4) An AI-powered rescue drone with object detection.";
      } else if (userInput.includes("skill") || userInput.includes("technolog") || userInput.includes("stack")) {
        botResponse = "My core technical stack includes Python, React, MongoDB, HTML/CSS/JavaScript, Machine Learning (TensorFlow/PyTorch), and IoT integrations. I love turning these tools into impactful solutions.";
      } else if (userInput.includes("contact") || userInput.includes("hire") || userInput.includes("email") || userInput.includes("message")) {
        botResponse = "I can send an email directly to Harshavardhan right now! Please type out the message you would like to send him:";
        setAwaitingEmail(true);
      } else if (userInput.includes("hello") || userInput.includes("hi ") || userInput === "hi" || userInput.includes("hey")) {
        botResponse = "Hello there! Feel free to ask me anything about my 'projects', 'experience', 'skills', or type 'message' to send me an email!";
      } else if (userInput === "yes" && messages.length > 2) {
        // If they just say yes, assume they want to send the previous unrecognized message
        const previousMessage = messages[messages.length - 2].text;
        
        emailjs.send(
          'service_lop5e19', 
          'template_vc5sssm', 
          {
            from_name: "Portfolio Chatbot",
            reply_to: "no-reply@portfolio.com",
            message: previousMessage,
            to_email: "harshavarthanshan027@gmail.com"
          },
          'Q3cjOkJvUA8O-KLMH'
        ).then(() => {
          setMessages(prev => [...prev, { id: prev.length + 1, text: "✅ Sent that directly to his inbox!", sender: 'bot', timestamp: new Date() }]);
        });
        
        botResponse = null; // Prevent the default appended response
      } else {
        const fallbacks = [
          "I'm not exactly sure what you mean. Would you like me to forward that to Harshavardhan's email? (Type 'yes' to send it)",
          "I'm still learning! If you'd like, type 'message' and I can email him directly for you."
        ];
        botResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      if (botResponse) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }]);
      }

      setIsLoading(false);
    }, 600);
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
