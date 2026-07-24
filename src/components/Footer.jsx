import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <h2>Alan Thomas</h2>

      <p>
        Thank you for visiting my portfolio.
        Feel free to connect with me!
      </p>

      <div className="footer-icons">

        <a
          href="https://github.com/Alanatk"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/alan-thomas-b30885276/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>

        <a href="mailto:alanthomask77@gmail.com">
          <FaEnvelope />
        </a>

      </div>

      <p className="copyright">
        © 2026 Alan Thomas. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;
