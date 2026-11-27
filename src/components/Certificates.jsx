import {
  FaCertificate,
  FaCloud,
  FaRobot,
  FaShieldAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { certificateFiles } from "../data/portfolioAssets";
import { certificates } from "../data/portfolioKnowledge";

const icons = { oracle: FaCloud, ibm: FaRobot, cloud: FaCloud, cyber: FaShieldAlt, servicenow: FaCertificate };

function Certificates() {
  return (
    <section
      className="certificates"
      id="certificates"
      data-aos="zoom-in-up"
    >
      <h2>Certifications</h2>

      <div className="certificate-grid">
        {certificates.map((cert) => {
          const Icon = icons[cert.id];
          return (
            <div
              className="certificate-card"
              key={cert.title}
            >
              <div className="certificate-icon">
                <Icon />
              </div>

              <h3>{cert.title}</h3>

              <p>{cert.issuer}</p>

              <span className="certificate-year">
                {cert.year}
              </span>

              <a
                href={certificateFiles[cert.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-btn"
                aria-label={`View ${cert.title} certificate`}
              >
                <FaExternalLinkAlt />
                View Certificate
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Certificates;
