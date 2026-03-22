import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    emailjs
      .send(
        "service_lop5e19",
        "template_vc5sssm",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: "harshavarthanshan027@gmail.com",
          subject: formData.subject || "Portfolio Contact Form",
        },
        "Q3cjOkJvUA8O-KLMH",
      )
      .then(() => {
        setSending(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setSending(false);
        setError(
          "Failed to send message. Please try again or use the email link directly.",
        );
      });
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-bg-text">CONTACT</div>
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          background: "var(--accent2)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="section-label reveal"
        style={{ justifyContent: "center" }}
      >
        04 — Contact
      </div>

      <h2 className="contact-title reveal">
        LET'S BUILD
        <br />
        <span className="stroke">SOMETHING</span>
        <br />
        GREAT.
      </h2>

      <p className="contact-sub reveal">
        Have an interesting project or opportunity? Drop me a message and I'll
        get back to you within 24 hours.
      </p>

      <div className="contact-grid reveal">
        {/* Left Side: Form Card (Swapped) */}
        <div className="contact-form-card">
          <h3 className="form-title">Send Me a Message</h3>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group-solid">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="form-group-solid">
              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                required
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="form-group-solid">
              <label>Message</label>
              <textarea
                placeholder="Your message..."
                value={formData.message}
                required
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            
            <button type="submit" className="btn-submit-solid" disabled={sending}>
              {sending ? "Sending..." : "Send Message"} <Send size={16} style={{ marginLeft: "8px" }} />
            </button>
            
            {error && <div className="error-msg">{error}</div>}
            {submitted && <div className="success-msg">✓ Message sent successfully!</div>}
          </form>
        </div>

        {/* Right Side: Contact Information (Swapped) */}
        <div className="contact-info-left">
          <h3 className="info-title">Contact Information</h3>
          <p className="info-desc">
            I'm currently open to new opportunities and interesting projects. Whether you have a question or just want to say hi, I'll get back to you as soon as possible!
          </p>
          
          <div className="info-list">
            <div className="info-item">
              <div className="icon-box"><Mail size={18} /></div>
              <div className="details">
                <span className="label">Email</span>
                <span className="value">harshavarthanshan027@gmail.com</span>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-box"><MapPin size={18} /></div>
              <div className="details">
                <span className="label">Location</span>
                <span className="value">India</span>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-box"><Phone size={18} /></div>
              <div className="details">
                <span className="label">Phone</span>
                <span className="value">+91 9597886588</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
