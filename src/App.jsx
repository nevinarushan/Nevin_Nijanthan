import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import CertificatesSection from './components/CertificatesSection';
import Modal from './components/Modal';
import ExperienceCard from './components/ExperienceCard';
import ExtracurricularCard from './components/ExtracurricularCard';
import ProjectCard from './components/ProjectCard';
import CompetencyCard from './components/CompetencyCard';
import './styles/App.css';

const App = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize static data for better performance
  const typingTexts = useMemo(() => ['Project Manager', 'Programmer', 'AI Enthusiast'], []);
  const helloWorldText = useMemo(() => 'Hello World!!', []);

  // Certificate data - memoized for performance
  const certificates = useMemo(() => [
    {
      id: 1,
      name: "Coursera Certificate",
      provider: "Coursera",
      certificateId: "QGLIU10R3M8C",
      image: "/src/assets/images/Coursera QGLIU10R3M8C_page-0001.jpg",
      alt: "Coursera Certificate 1"
    },
    {
      id: 2,
      name: "Coursera Certificate",
      provider: "Coursera", 
      certificateId: "T82D1OEW2C9K",
      image: "/src/assets/images/Coursera T82D1OEW2C9K (1)_page-0001.jpg",
      alt: "Coursera Certificate 2"
    },
    {
      id: 3,
      name: "Coursera Certificate",
      provider: "Coursera",
      certificateId: "M5B0FLEZRBZP",
      image: "/src/assets/images/Coursera M5B0FLEZRBZP_page-0001.jpg",
      alt: "Coursera Certificate 3"
    }
  ], []);

  // Modal functions - optimized with useCallback
  const openModal = useCallback((certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = 'unset';
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closeModal]);

  const sections = useMemo(() => [
    { id: 'home', title: 'Section 1 - Home' },
    { id: 'about', title: 'Section 2 - About' },
    { id: 'experience', title: 'Section 3 - Experience' },
    { id: 'extracurricular', title: 'Section 4 - Extra Curricular' },
    { id: 'education', title: 'Section 5 - Education' },
    { id: 'project', title: 'Section 6 - Project' },
    { id: 'section7', title: 'Section 7' },
    { id: 'section8', title: 'Section 8' },
    { id: 'section9', title: 'Section 9' }
  ], []);

  // Loading screen typing effect
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        if (loadingText.length < helloWorldText.length) {
          setLoadingText(helloWorldText.substring(0, loadingText.length + 1));
        } else {
          // Wait 2 seconds after typing is complete, then hide loading
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [loadingText, isLoading, helloWorldText]);

  // Optimized typing animation with requestAnimationFrame
  useEffect(() => {
    if (!isLoading) {
      let animationId;
      let lastTime = 0;
      const delay = isDeleting ? 50 : 100;

      const animate = (currentTime) => {
        if (currentTime - lastTime >= delay) {
          const current = typingTexts[currentIndex];

          if (!isDeleting) {
            setCurrentText(current.substring(0, currentText.length + 1));

            if (currentText === current) {
              setTimeout(() => setIsDeleting(true), 2000);
              return;
            }
          } else {
            setCurrentText(current.substring(0, currentText.length - 1));

            if (currentText === '') {
              setIsDeleting(false);
              setCurrentIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
              return;
            }
          }
          lastTime = currentTime;
        }
        animationId = requestAnimationFrame(animate);
      };

      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [currentText, isDeleting, currentIndex, typingTexts, isLoading]);

  return (
    <div className="min-h-screen position-relative">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-text">
              <span className="loading-brackets">&lt;</span>
              <span className="loading-hello">{loadingText}</span>
              <span className="loading-cursor">|</span>
              <span className="loading-brackets">/&gt;</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Hidden during loading */}
      <div className={`main-content ${isLoading ? 'hidden' : 'visible'}`}>
        {/* Animated Background */}
        <div className="animated-background"></div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-circle circle-4"></div>
          <div className="floating-circle circle-5"></div>
        </div>

        <Header />

        {/* Main Content */}
        <main className="pt-20 position-relative" style={{ zIndex: 2 }}>
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="min-h-screen d-flex align-items-center justify-content-center text-dark position-relative"
              style={{
                background: index % 2 === 0
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(255, 255, 240, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {section.id === 'home' ? (
                <div className="text-center p-4">
                  <h1 className="hero-title fw-bold mb-4 text-shadow">
                    Hi I am Nevin Nijanthan
                  </h1>
                  <div className="typing-container mb-4">
                    <span className="permanent-text">I'm a </span>
                    <span className="typing-text">{currentText}</span>
                    <span className="cursor">|</span>
                  </div>
                  <p className="hero-description fs-4 text-muted mx-auto">
                    I'm an Aspiring Project manager with a passion for running successful teams and creating beautiful and functional web applications during my free time.
                  </p>
                </div>
              ) : section.id === 'about' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-bio-box">
                        <div className="bio-header text-center mb-4">
                          <h2 className="bio-title">About Me</h2>
                          <div className="bio-subtitle">
                            <span className="emoji">👨‍💻</span> Nevin Arushan Nijanthan
                          </div>
                        </div>

                        {/* Optimized credentials grid - 2 columns, 3 rows */}
                        <div className="credentials-grid mb-4">
                          <div className="credential-box">
                            <span className="credential-emoji">🎓</span>
                            <span className="credential-text">Undergraduate at Sri Lanka Institute of Information Technology</span>
                          </div>
                          <div className="credential-box">
                            <span className="credential-emoji">🎓</span>
                            <span className="credential-text">Alumnus of St. Peter's College</span>
                          </div>
                          <div className="credential-box">
                            <span className="credential-emoji">🌟</span>
                            <span className="credential-text">Passionate about Programming & Project Management | Python Enthusiast</span>
                          </div>
                          <div className="credential-box">
                            <span className="credential-emoji">🤝</span>
                            <span className="credential-text">Rotaract Club Committee Member – Club Services</span>
                          </div>
                          <div className="credential-box">
                            <span className="credential-emoji">🔬</span>
                            <span className="credential-text">IEEE Volunteer</span>
                          </div>
                          <div className="credential-box">
                            <span className="credential-emoji">🧭</span>
                            <span className="credential-text">Scout – Group Scout Master</span>
                          </div>
                        </div>

                        <div className="bio-description">
                          <p>
                            Hello there! I'm Nevin Arushan Nijanthan, a driven individual with a strong passion for programming, technology, and project management. My educational journey at St. Peter's College laid a solid foundation, while my undergraduate studies at SLIIT have deepened my technical expertise—particularly in Python and software development.
                          </p>
                          <p>
                            Beyond coding, I'm enthusiastic about leading and managing projects that create meaningful impact. I thrive on collaboration, problem-solving, and driving initiatives from idea to execution. My involvement as a Rotaract Club Committee Member (Club Services), IEEE Volunteer, and Group Scout Master reflects my dedication to leadership, teamwork, and community service.
                          </p>
                          <p>
                            Whether it's managing a project, writing code, or working with diverse teams, I'm always eager to learn, grow, and contribute.
                          </p>
                          <p className="closing-message">
                            Let's connect and explore ways to innovate, lead, and make a difference in the world of technology together!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'experience' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-experience-box">
                        <div className="experience-header text-center mb-4">
                          <h2 className="experience-title">Professional Experience</h2>
                          <p className="experience-subtitle">Building expertise through hands-on projects and leadership roles</p>
                        </div>

                        <div className="experience-grid">
                          <ExperienceCard 
                            title="Information Technology Trainee (Summer Internship)"
                            company="INSEE Cement"
                            type="Internship"
                            duration="Jul 2025 - Aug 2025 · 2 mos"
                            location="Access tower · On-site"
                            categories={[
                              {
                                title: "Software Development",
                                items: [
                                  "Built and deployed a Python app to extract data from PDF reports into Excel",
                                  "Automated HP printer driver installation using Java, PowerShell, and Windows Installer",
                                  "Created a Python/PowerShell tool with JSON config for software deployment on new laptops"
                                ]
                              },
                              {
                                title: "Networking & Server Monitoring",
                                items: [
                                  "Gained foundational networking knowledge (IP, LAN/WAN, diagnostics)",
                                  "Monitored server metrics, performed maintenance, changed backup tapes, and ensured optimal server room conditions"
                                ]
                              },
                              {
                                title: "Daily IT Tasks",
                                items: [
                                  "Prepared connectivity reports and resolved day-to-day IT issues to ensure uptime"
                                ]
                              },
                              {
                                title: "Hardware Support",
                                items: [
                                  "Configured laptops with OS updates and domain integration; resolved printer issues (hardware/software)"
                                ]
                              },
                              {
                                title: "Corporate Governance",
                                items: [
                                  "Learned IT governance, security policies, data protection, and risk management"
                                ]
                              }
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'extracurricular' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-extracurricular-box">
                        <div className="extracurricular-header text-center mb-4">
                          <h2 className="extracurricular-title">Extracurricular Activities</h2>
                          <p className="extracurricular-subtitle">Leadership, Service, and Personal Development</p>
                        </div>

                        <div className="extracurricular-grid">
                          {/* IEEE Activities Column */}
                          <div className="activity-column">
                            <h3 className="column-title">IEEE Activities</h3>
                            <ExtracurricularCard 
                              title="Logistics Team Lead (Robomesh)"
                              duration="Sep 2025 - Present · 1 mo"
                              description="Leading logistics coordination for Robomesh, a comprehensive robotics exhibition showcasing cutting-edge robotics technology, innovations, and interactive demonstrations for students and industry professionals."
                            />
                            <ExtracurricularCard 
                              title="Program Team Lead (Cell spell)"
                              duration="Jul 2025 - Aug 2025 · 2 mos"
                              description="Working as the program team lead for Cell Spell a project done by the IEEE society of SLIIT EMBS society. This project consisted of 2 online workshops and industry visits"
                            />
                            <ExtracurricularCard 
                              title="Logistics Team Lead (Path to Internship 25)"
                              duration="May 2025 - Jul 2025 · 3 mos"
                              description="Served as the Logistics team lead for Path to Internship 25. A project done in order to connect students to industry. 1000+ students attended the event. A career fair, online workshop and industry visits were done as a part of the project"
                            />
                          </div>

                          {/* Rotaract Activities Column */}
                          <div className="activity-column">
                            <h3 className="column-title">Rotaract Club</h3>
                            <ExtracurricularCard 
                              title="Committee Member"
                              organization="Rotaract Club of SLIIT"
                              duration="Sep 2024 - Jun 2025 · 10 mos"
                              location="Sri Lanka"
                              description="• Organizing Committee Member – Project Unhinged: Stand-Up Comedy Show. Contributed to the successful planning and execution of Project Unhinged, a stand-up comedy event aimed at promoting youth engagement and entertainment. Managed logistics, coordinated with performers and technical teams, and ensured a smooth event flow.

• Project Chair – Rotaverse Lite. Led Rotaverse Lite, a strategic initiative designed to attract and engage more undergraduate students in the Rotaract Club. Oversaw project planning, marketing, and event execution, resulting in increased awareness and participation among the target audience."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'education' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-education-box">
                        <div className="education-header text-center mb-4">
                          <h2 className="education-title">Education</h2>
                          <p className="education-subtitle">Academic Journey & Achievements</p>
                        </div>

                        <div className="education-timeline">
                          {/* Timeline Item 1 - Left Side */}
                          <div className="timeline-item left">
                            <div className="timeline-content">
                              <div className="timeline-year">2021</div>
                              <h4 className="timeline-institution">St Peters College</h4>
                              <p className="timeline-qualification">GCE Ordinary Level</p>
                            </div>
                            <div className="timeline-dot"></div>
                          </div>

                          {/* Timeline Item 2 - Right Side */}
                          <div className="timeline-item right">
                            <div className="timeline-content">
                              <div className="timeline-year">2023</div>
                              <h4 className="timeline-institution">St Peters College</h4>
                              <p className="timeline-qualification">GCE Advanced Level</p>
                            </div>
                            <div className="timeline-dot"></div>
                          </div>

                          {/* Timeline Item 3 - Left Side */}
                          <div className="timeline-item left">
                            <div className="timeline-content">
                              <div className="timeline-year">2024 - Present</div>
                              <h4 className="timeline-institution">Sri Lanka Institute of Information Technology</h4>
                              <p className="timeline-qualification">BSc In Information Technology Specializing in Information Technology</p>
                            </div>
                            <div className="timeline-dot"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'project' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-projects-box">
                        <div className="projects-header text-center mb-4">
                          <h2 className="projects-title">Projects</h2>
                          <p className="projects-subtitle">Showcasing Technical Skills & Innovation</p>
                        </div>

                        <div className="projects-grid">
                          <ProjectCard 
                            title="Web Based Insurance Management System"
                            description="Comprehensive insurance management platform with policy tracking and claims processing functionality."
                            githubUrl="https://github.com/nevinarushan/Web-based-Insurance-Management-System"
                          />
                          <ProjectCard 
                            title="INSEE Cements Automation Software"
                            description="Network connectivity report generator and automation tools for enterprise IT infrastructure management."
                            githubUrl="https://github.com/nevinarushan/Network-connectivity-report-generator-"
                          />
                          <ProjectCard 
                            title="AI ML Pipeline"
                            description="Machine learning pipeline implementation with data processing and model training capabilities."
                            githubUrl="https://github.com/nevinarushan/AI-ML-pipeline-"
                          />
                          <ProjectCard 
                            title="Portfolio Webpage"
                            description="Personal portfolio website built with React and modern web technologies for professional showcase."
                            githubUrl="https://github.com/nevinarushan/Nevin_Nijanthan"
                          />
                          <ProjectCard 
                            title="Blog Page"
                            description="Dynamic blog platform with content management system and responsive design implementation."
                            githubUrl="https://github.com/nevinarushan/Blog-Page-"
                          />
                          <ProjectCard 
                            title="Software Install Automater"
                            description="Automated software installation tool for streamlined system setup and deployment processes."
                            githubUrl="https://github.com/nevinarushan/Software-Install-Automater"
                          />
                          <ProjectCard 
                            title="Web Calculator"
                            description="Interactive web-based calculator with advanced mathematical operations and clean user interface."
                            githubUrl="https://github.com/nevinarushan/Web-Calculator"
                          />
                          <ProjectCard 
                            title="Ticket Management System"
                            description="University project for IT support ticket tracking with user management and priority handling."
                            githubUrl="https://github.com/nevinarushan/Uni-Porject-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'section7' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-skills-box">
                        <div className="skills-header text-center mb-4">
                          <h2 className="skills-title">Technical Skills</h2>
                          <p className="skills-subtitle">Programming Languages & Frameworks</p>
                        </div>

                        <div className="skills-sections">
                          {/* Languages Row */}
                          <div className="skills-category">
                            <h3 className="category-title">Languages</h3>
                            <div className="skills-row">
                              <div className="skill-item">
                                <img src="/src/assets/java-svgrepo-com.svg" alt="Java" className="skill-icon" />
                                <span className="skill-name">Java</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/python-svgrepo-com.svg" alt="Python" className="skill-icon" />
                                <span className="skill-name">Python</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/javascript-svgrepo-com.svg" alt="JavaScript" className="skill-icon" />
                                <span className="skill-name">JavaScript</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/html-svgrepo-com.svg" alt="HTML" className="skill-icon" />
                                <span className="skill-name">HTML</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/css-3-svgrepo-com.svg" alt="CSS" className="skill-icon" />
                                <span className="skill-name">CSS</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/mysql-svgrepo-com.svg" alt="MySQL" className="skill-icon" />
                                <span className="skill-name">MySQL</span>
                              </div>
                            </div>
                          </div>

                          {/* Frameworks Row */}
                          <div className="skills-category">
                            <h3 className="category-title">Frameworks</h3>
                            <div className="skills-row">
                              <div className="skill-item">
                                <img src="/src/assets/icons8-spring-boot.svg" alt="Spring Boot" className="skill-icon" />
                                <span className="skill-name">Spring Boot</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/nextjs-svgrepo-com.svg" alt="Next.js" className="skill-icon" />
                                <span className="skill-name">Next.js</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/react-svgrepo-com.svg" alt="React" className="skill-icon" />
                                <span className="skill-name">React</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/nodejs-svgrepo-com.svg" alt="Node.js" className="skill-icon" />
                                <span className="skill-name">Node.js</span>
                              </div>
                              <div className="skill-item">
                                <img src="/src/assets/bootstrap-svgrepo-com.svg" alt="Bootstrap" className="skill-icon" />
                                <span className="skill-name">Bootstrap</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'section8' ? (
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-xl-10">
                      <div className="floating-competencies-box">
                        <div className="competencies-header text-center mb-4">
                          <h2 className="competencies-title">Core Competencies</h2>
                          <p className="competencies-subtitle">Project Management & Leadership Skills</p>
                        </div>

                        <div className="competencies-grid">
                          <CompetencyCard 
                            title="Technical Skills"
                            skills={[
                              "Proficient in software development, networking, databases, cloud, and IT infrastructure.",
                              "Experienced with project management tools: Jira, Trello, Asana, MS Project.",
                              "Skilled in Agile methodology, Scrum framework, and Kanban practices.",
                              "Capable of identifying risks, planning mitigation, and ensuring project quality.",
                              "Competent in cost estimation, resource allocation, and ROI analysis."
                            ]}
                          />
                          <CompetencyCard 
                            title="Project Management Skills"
                            skills={[
                              "Expert in breaking down projects into phases, creating timelines, and setting milestones.",
                              "Skilled at defining project goals, deliverables, and preventing scope creep.",
                              "Effective at ensuring tasks are completed on schedule and within deadlines.",
                              "Adept at quickly resolving issues that arise during project lifecycles.",
                              "Proficient in tracking progress using KPIs and reporting to stakeholders."
                            ]}
                          />
                          <CompetencyCard 
                            title="Interpersonal & Leadership Skills"
                            skills={[
                              "Excellent communicator with clients, stakeholders, and team members.",
                              "Strong leader who motivates teams, delegates tasks, and resolves conflicts.",
                              "Skilled negotiator handling contracts, timelines, and resource constraints.",
                              "Effective team manager who understands dynamics and fosters collaboration.",
                              "Adaptable professional who adjusts to changing requirements and resolves conflicts."
                            ]}
                          />
                          <CompetencyCard 
                            title="Analytical & Strategic Thinking"
                            skills={[
                              "Skilled at making data-driven decisions for project success.",
                              "Experienced in aligning IT projects with business objectives.",
                              "Proficient at identifying root causes and implementing effective solutions.",
                              "Committed to continuously optimizing workflows and methodologies.",
                              "Strong business acumen with understanding of market trends and goals."
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : section.id === 'section9' ? (
                <CertificatesSection 
                  certificates={certificates}
                  onCertificateClick={openModal}
                />
              ) : (
                <div className="text-center p-4">
                  <h1 className="display-1 fw-bold mb-4 text-shadow">
                    {section.title}
                  </h1>
                  <p className="fs-3 opacity-75">
                    Replace this placeholder content with your actual content
                  </p>
                </div>
              )}
            </section>
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-gradient-line"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-11 col-xl-10 mx-auto">
              <div className="footer-content">
                <div className="footer-grid">
                  {/* Brand Section */}
                  <div className="footer-brand">
                    <a href="#home" className="brand-link">
                      NEVIN<span className="brand-accent">.dev</span>
                    </a>
                    <p className="brand-description">
                      Aspiring Project Manager and Full-stack developer crafting beautiful and functional web applications with modern technologies.
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="footer-links">
                    <h3 className="footer-heading">Quick Links</h3>
                    <div className="links-grid">
                      <a href="#home" className="footer-link">Home</a>
                      <a href="#about" className="footer-link">About</a>
                      <a href="#experience" className="footer-link">Experience</a>
                      <a href="#extracurricular" className="footer-link">Activities</a>
                      <a href="#education" className="footer-link">Education</a>
                      <a href="#project" className="footer-link">Projects</a>
                      <a href="#section7" className="footer-link">Skills</a>
                      <a href="#section9" className="footer-link">Certificates</a>
                    </div>
                  </div>

                  {/* Social Connect */}
                  <div className="footer-social">
                    <h3 className="footer-heading">Connect</h3>
                    <div className="social-links">
                      <a 
                        href="https://github.com/nevinarushan" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                        aria-label="GitHub Profile"
                      >
                        <svg className="social-icon" viewBox="0 0 496 512" fill="currentColor">
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/nevin-nijanthan-9a1824274" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                        aria-label="LinkedIn Profile"
                      >
                        <svg className="social-icon" viewBox="0 0 448 512" fill="currentColor">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="footer-divider"></div>

                {/* Copyright */}
                <div className="footer-bottom">
                  <p className="copyright-text">© 2025 NEVIN.dev • All rights reserved</p>
                  <p className="footer-signature">
                    <span className="signature-badge">
                      DESIGNED WITH <span className="heart-icon">♥</span> IN SRI LANKA
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom-gradient"></div>
      </footer>

      {/* Certificate Modal */}
      <Modal 
        isOpen={isModalOpen}
        certificate={selectedCertificate}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;
