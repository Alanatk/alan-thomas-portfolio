import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.error(error);
          alert("Failed to send message.");
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact" id="contact" data-aos="fade-up">
      <h2>Contact Me</h2>

      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-info">
          <h3>Let's Connect</h3>

          <p>
            I'm always open to internship opportunities,
            collaborations, and new learning experiences.
            Feel free to contact me.
          </p>

          <div className="info-item">
            <FaEnvelope />
            <span>alanthomask77@gmail.com</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt />
            <span>Palakkad, Kerala, India</span>
          </div>

          <div className="info-item">
            <FaGithub />
            <a
              href="https://github.com/Alanatk"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Alanatk
            </a>
          </div>

          <div className="info-item">
            <FaLinkedin />
            <a
              href="https://www.linkedin.com/in/alan-thomas-b30885276/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/alan-thomas-b30885276
            </a>
          </div>
        </div>

        {/* Right Side */}
        <form
          ref={form}
          className="contact-form"
          onSubmit={sendEmail}
        >
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;