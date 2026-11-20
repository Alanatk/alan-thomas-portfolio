
import {
  FaGraduationCap,
  FaUniversity,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

function Education() {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      college: "LEAD College of Management",
      year: "2025 - 2027",
      status: "Currently Pursuing",
      description:
        "Currently pursuing MCA with a focus on Software Development, Cloud Computing, and Artificial Intelligence.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      college: "Sree Narayana Guru College",
      year: "Completed",
      status: "Graduated",
      description:
        "Built a strong foundation in programming, databases, networking, and web development.",
    },
  ];

  return (
    <section
      className="education"
      id="education"
      data-aos="fade-up"
    >
      <h2>Education</h2>

      <div className="timeline">
        {education.map((item) => (
          <div className="timeline-item" key={item.degree}>
            <div className="timeline-icon">
              <FaGraduationCap />
            </div>

            <div className="timeline-content">
              <div className="education-status">
                <FaBookOpen />
                {item.status}
              </div>

              <h3>{item.degree}</h3>

              <h4>
                <FaUniversity />
                {item.college}
              </h4>

              <span className="education-year">
                <FaCalendarAlt />
                {item.year}
              </span>

              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
