import { FaGraduationCap } from "react-icons/fa";

function Education() {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      college: "LEAD College of Management",
      year: "2025 - 2027",
      description:
        "Currently pursuing MCA with a focus on Software Development, Cloud Computing, and Artificial Intelligence.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      college: "Sree Narayana Guru College",
      year: "Completed",
      description:
        "Built a strong foundation in programming, databases, networking, and web development.",
    },
  ];

  return (
    <section className="education" id="education" data-aos="fade-up">
      <h2>Education</h2>

      <div className="timeline">
        {education.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon">
              <FaGraduationCap />
            </div>

            <div className="timeline-content">
              <h3>{item.degree}</h3>
              <h4>{item.college}</h4>
              <span>{item.year}</span>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;