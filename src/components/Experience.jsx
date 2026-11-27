import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCertificate,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";

import { internship } from "../data/portfolioAssets";
import { currentInternship, previousInternship } from "../data/portfolioKnowledge";

function Experience() {
  return (
    <section className="experience" id="experience" data-aos="fade-up">
      <h2 className="experience-heading">My Experience</h2>

      <div className="experience-container">
        <article className="experience-card">
          <div className="experience-icon" aria-hidden="true">
            <FaBriefcase />
          </div>
          <div className="experience-content">
            <div className="experience-status">
              <FaCheckCircle aria-hidden="true" /> {currentInternship.status}
            </div>
            <h3>{currentInternship.role}</h3>
            <h4 className="experience-company">
              <FaBuilding aria-hidden="true" />
              <span>{currentInternship.company}</span>
            </h4>
            <p className="experience-type">
              <FaCode aria-hidden="true" />
              <span>Internship</span>
            </p>
            <p className="experience-date">
              <FaCalendarAlt aria-hidden="true" />
              <span>14 November 2026 – Present</span>
            </p>
            <p className="experience-description">
              Currently working as a Python Django Developer Intern, developing
              backend applications, REST APIs, database models, and
              authentication functionalities while gaining practical experience
              in software development.
            </p>
            <div className="experience-technologies" aria-label="Technologies">
              {currentInternship.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="experience-card">
          <div className="experience-icon" aria-hidden="true">
            <FaBriefcase />
          </div>
          <div className="experience-content">
            <h3>{previousInternship.role}</h3>
            <h4 className="experience-company">
              <FaBuilding aria-hidden="true" />
              <span>{previousInternship.company}</span>
            </h4>
            <p className="experience-type">
              <FaCode aria-hidden="true" />
              <span>Internship | {previousInternship.department}</span>
            </p>
            <p className="experience-date">
              <FaCalendarAlt aria-hidden="true" />
              <span>23 July 2026 – 14 October 2026</span>
            </p>
            <p className="experience-description">
              {previousInternship.description}
            </p>
            <div className="experience-certificate">
              <a
                className="experience-certificate-btn"
                href={internship}
                target="_blank"
                rel="noreferrer"
              >
                <FaCertificate aria-hidden="true" />
                View Internship Certificate
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Experience;
