
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

import { profile } from "../data/portfolioKnowledge";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("Message sent successfully!");
      form.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="contact"
      id="contact"
      data-aos="fade-up"
    >
      <h2>Contact Me</h2>

      <div className="contact-container">

        {/* Left Side - Contact Information */}

        <div className="contact-info">
          <h3>Let's Connect</h3>

          <p>
           I'm passionate about technology and software development, and always eager to explore new opportunities, contribute to meaningful projects, and grow my technical skills.
          </p>

          <div className="info-item">
            <FaEnvelope />
            <span>{profile.email}</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt />
            <span>{profile.location}</span>
          </div>

          <div className="info-item">
            <FaGithub />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Alanatk
            </a>
          </div>

          <div className="info-item">
            <FaLinkedin />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}

        <form
          ref={form}
          className="contact-form"
          onSubmit={sendEmail}
        >
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            aria-label="Your Name"
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            aria-label="Your Email"
            autoComplete="email"
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            aria-label="Your Message"
            required
          />

          <button type="submit" disabled={loading}>
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}

export default Contact;
