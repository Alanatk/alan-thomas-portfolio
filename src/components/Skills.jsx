import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaNodeJs,
} from "react-icons/fa";

import { SiMysql } from "react-icons/si";

import { skills } from "../data/portfolioKnowledge";

const skillIcons = {
  HTML: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJs,
  React: FaReact,
  "Node.js": FaNodeJs,
  Python: FaPython,
  MySQL: SiMysql,
  Git: FaGitAlt,
  Docker: FaDocker,
};

function Skills() {
  return (
    <section className="skills" id="skills" data-aos="zoom-in">
      <h2>My Skills</h2>

      <div className="skills-grid">
        {skills.map((skill) => {
          const Icon = skillIcons[skill];
          return (
            <div className="skill-card" key={skill}>
              {Icon && <div className="skill-icon"><Icon /></div>}
              <h3>{skill}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
