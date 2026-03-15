import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    emailjs.send(
      'service_lop5e19',
      'template_vc5sssm',
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: "harshavarthanshan027@gmail.com",
        subject: formData.subject || "Portfolio Contact Form"
      },
      'Q3cjOkJvUA8O-KLMH'
    ).then(() => {
      setSending(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }).catch((err) => {
      console.error("EmailJS Error:", err);
      setSending(false);
      setError("Failed to send message. Please try again or use the email link directly.");
    });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-bg-text">CONTACT</div>
      <div className="glow-orb" style={{ 
        width: 500, 
        height: 500, 
        background: "var(--accent2)", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)" 
      }} />

      <div className="section-label reveal" style={{ justifyContent: "center" }}>
        04 — Contact
      </div>

      <h2 className="contact-title reveal">
        LET'S BUILD<br />
        <span className="stroke">SOMETHING</span><br />
        GREAT.
      </h2>

      <p className="contact-sub reveal">
        Have an interesting project or opportunity? Drop me a message and I'll get back to you within 24 hours.
      </p>

      <form className="contact-form reveal" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              required
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <label>Your Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <label>Your Email</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
          />
          <label>Subject</label>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Message"
            value={formData.message}
            required
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
          <label>Your Message</label>
        </div>
        <div className="form-submit">
          <button type="submit" className="btn-submit" disabled={sending}>
            <span>{sending ? "Sending Message..." : "Send Message →"}</span>
          </button>
        </div>
        {error && (
          <div className="error-msg" style={{ color: '#ff4444', marginTop: '10px' }}>
            {error}
          </div>
        )}
        {submitted && (
          <div className="success-msg">
            ✓ Message sent successfully! I will get back to you soon.
          </div>
        )}
      </form>

      <div className="contact-info reveal">
        <div className="contact-info-item">
          <div className="contact-info-label">Email</div>
          <div className="contact-info-value">
            <a href="mailto:harshavarthanshan027@gmail.com">harshavarthanshan027@gmail.com</a>
          </div>
        </div>
        <div className="contact-info-item">
          <div className="contact-info-label">Location</div>
          <div className="contact-info-value">Bengaluru, India</div>
        </div>
        <div className="contact-info-item">
          <div className="contact-info-label">Status</div>
          <div className="contact-info-value" style={{ color: "var(--accent)" }}>
            ● Open to Work
          </div>
        </div>
      </div>
    </section>
  );
}
