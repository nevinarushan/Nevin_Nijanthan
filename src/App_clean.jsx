import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import CertificatesSection from './components/CertificatesSection';
import Modal from './components/Modal';
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

                        <div className="bio-content">
                          <div className="credentials-roles-grid mb-4">
                            <div className="credential-item">
                              <span className="emoji">🎓</span>
                              <span>Undergraduate at Sri Lanka Institute of Information Technology</span>
                            </div>
                            <div className="credential-item">
                              <span className="emoji">🎓</span>
                              <span>Alumnus of St. Peter's College</span>
                            </div>
                            <div className="credential-item">
                              <span className="emoji">🌟</span>
                              <span>Passionate about Programming & Project Management | Python Enthusiast</span>
                            </div>
                            <div className="role-item">
                              <span className="emoji">🤝</span>
                              <span>Rotaract Club Committee Member – Club Services</span>
                            </div>
                            <div className="role-item">
                              <span className="emoji">🔬</span>
                              <span>IEEE Volunteer</span>
                            </div>
                            <div className="role-item">
                              <span className="emoji">🧭</span>
                              <span>Scout – Group Scout Master</span>
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
