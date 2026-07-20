import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import profile from "../assets/alan.png";
import resume from "../assets/resume/ALAN THOMAS.pdf";
function Hero() {
  return (
    <section className="hero" id="home" data-aos="fade-up">

      {/* Left Side */}
      <div className="hero-text">

        <p className="hello"> Hello, I'm</p>

        <h1>Alan Thomas</h1>

        <TypeAnimation
          sequence={[
            "MCA Student",
            2000,
            "Cloud Enthusiast",
            2000,
            "DevOps Learner",
            2000,
            "Full Stack Developer",
            2000,
            "Cyber Security Enthusiast",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
          className="typing"
        />

        <p className="description">
          Passionate about Cloud Computing, DevOps, Cyber Security,
          and Full-Stack Web Development. I enjoy building modern
          web applications and continuously learning new technologies.
        </p>

        {/* Buttons */}
        <div className="buttons">
         <a
            href={resume}
            download="ALAN THOMAS.pdf"
            className="btn"
         >
           Download Resume
        </a>

         <a href="#projects" className="btn outline">
            View Projects
        </a>
        </div>

        {/* Social Icons */}
        <div className="social-icons">

          <a
            href="https://github.com/Alanatk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/alan-thomas-b30885276/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:alanthomask77@gmail.com">
            <FaEnvelope />
          </a>

        </div>

      </div>

      {/* Right Side */}
      <div className="hero-image">
        <img src={profile} alt="Alan Thomas" />
      </div>

    </section>
  );
}

export default Hero;
