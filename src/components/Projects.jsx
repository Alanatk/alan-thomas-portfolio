
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";

import { projects } from "../data/portfolioKnowledge";

function Projects() {
  return (
    <section
      className="projects"
      id="projects"
      data-aos="fade-left"
    >
      <h2>Featured Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-icon">
              <FaLaptopCode />
            </div>

            <h3>{project.title}</h3>

            <p className="project-description">
              {project.description}
            </p>

            <div className="tech-stack">
              {project.tech.map((tech) => (
                <span key={tech}>
                  <FaCode />
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-buttons">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
              >
                <FaExternalLinkAlt />
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
