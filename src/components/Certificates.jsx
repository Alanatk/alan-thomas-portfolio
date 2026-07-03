import {
  FaCertificate,
  FaCloud,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

import oracle from "../assets/certificates/Oracle.pdf";
import ibm from "../assets/certificates/IBM.pdf";
import servicenow from "../assets/certificates/ServiceNow.pdf";
import cloud from "../assets/certificates/Cloud.pdf";
import cyber from "../assets/certificates/Cyber.pdf";

function Certificates() {
  const certificates = [
    {
      title: "Oracle Cloud Infrastructure Foundations",
      issuer: "Oracle",
      year: "2024",
      icon: <FaCloud />,
      file: oracle,
    },
    {
      title: "Getting Started with Artificial Intelligence",
      issuer: "IBM SkillsBuild",
      year: "2025",
      icon: <FaRobot />,
      file: ibm,
    },
    {
      title: "Diploma in Cloud Computing",
      issuer: "STED Council",
      year: "2024",
      icon: <FaCloud />,
      file: cloud,
    },

    {
      title: "Diploma in Cyber Security",
      issuer: "STED Council",
      year: "2025",
      icon: <FaShieldAlt />,
      file: cyber,
   },
    {
      title: "ServiceNow Welcome Micro-Certification",
      issuer: "ServiceNow",
      year: "2025",
      icon: <FaCertificate />,
      file: servicenow,
    },
  ];

  return (
    <section className="certificates" id="certificates" data-aos="zoom-in-up">
      <h2>Certifications</h2>

      <div className="certificate-grid">
        {certificates.map((cert, index) => (
          <div className="certificate-card" key={index}>
            <div className="certificate-icon">
              {cert.icon}
            </div>

            <h3>{cert.title}</h3>

            <p>{cert.issuer}</p>

            <span>{cert.year}</span>

            {cert.file && (
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-btn"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificates;