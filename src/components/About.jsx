import { FaGraduationCap, FaCloud, FaShieldAlt, FaLaptopCode } from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about" data-aos="fade-right">
      <h2>About Me</h2>

      <div className="about-grid">
        <div className="card">
          <FaGraduationCap />
          <h3>MCA Student</h3>
          <p>LEAD College of Management</p>
        </div>

        <div className="card">
          <FaCloud />
          <h3>Cloud Computing</h3>
          <p>Oracle Cloud Certified</p>
        </div>

        <div className="card">
          <FaShieldAlt />
          <h3>Cyber Security</h3>
          <p>Diploma in Cyber Security</p>
        </div>

        <div className="card">
          <FaLaptopCode />
          <h3>Web Development</h3>
          <p>React, Node.js, JavaScript</p>
        </div>
      </div>
    </section>
  );
}

export default About;