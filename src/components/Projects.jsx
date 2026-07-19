import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function Projects() {
  const projects = [
    {
      title: "Bitcoin Price Predictor",
      description:
        "Machine learning application that predicts Bitcoin prices using historical cryptocurrency market data.",
      tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
      github: "https://github.com/Alanatk/Bitcoin-price-predictor",
      live: "https://bitcoin-price-predictor-lqzo.onrender.com",
    },
    {
      title: "MNIST Digit Recognition",
      description:
        "Deep learning application using TensorFlow and CNN to recognize handwritten digits with a Streamlit interface.",
      tech: ["Python", "TensorFlow", "CNN", "Streamlit"],
      github: "https://github.com/Alanatk/MNIST_digit_recognition",
      live: "https://mnistdigitrecognition.streamlit.app/",
    },
    {
      title: "Smart E-Commerce Checkout",
      description:
        "Responsive React checkout workflow with shopping cart, order summary, and payment interface.",
      tech: ["React", "JavaScript", "CSS", "Vite"],
      github:
        "https://github.com/Alanatk/smart-ecommerce-checkout-workflow",
      live:
        "https://alanatk.github.io/smart-ecommerce-checkout-workflow/",
    },
    {
      title: "Memory Card Matching Game",
      description:
        "Interactive browser game built using JavaScript with responsive design and smooth gameplay.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/Alanatk/memory-card-matching-game",
      live: "https://memory-card-matching-game-phi.vercel.app/",
    },
  ];

  return (
    <section className="projects" id="projects" data-aos="fade-left">
      <h2>Featured Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="tech-stack">
              {project.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            <div className="project-buttons">
              <a href={project.github} target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>

              <a href={project.live} target="_blank" rel="noreferrer">
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
