
import {
  FaBriefcase,
  FaCode,
  FaCalendarAlt,
  FaBuilding,
  FaCertificate,
} from "react-icons/fa";

import PrabishaCertificate from "../assets/certificates/prabisha-internship-certificate.jpg";
function Experience() {
  return (
    <section className="experience" id="experience" data-aos="fade-up">
      <h2 className="experience-heading">My Experience</h2>

      <div className="experience-container">
        <div className="experience-card">

          {/* Experience Icon */}
          <div className="experience-icon">
            <FaBriefcase />
          </div>

          {/* Experience Details */}
          <div className="experience-content">

            <h3>AI/ML Intern</h3>

            <h4>
              <FaBuilding /> <span>Prabisha Consulting</span>
            </h4>

            <p className="experience-type">
              <FaCode /> <span>Internship | IT Department</span>
            </p>

            <p className="experience-date">
              <FaCalendarAlt />
              23 July 2026 – 14 October 2026
            </p>

            <p>
              Completed an internship in Artificial Intelligence
              and Machine Learning, gaining practical exposure
              to technical concepts and professional development
              practices.
            </p>

            {/* Internship Certificate */}
            <div className="experience-certificate">
              <a className="experience-certificate-btn"
                href={PrabishaCertificate}
                target="_blank"
                rel="noreferrer"
              >
                <FaCertificate />
                View Internship Certificate
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
