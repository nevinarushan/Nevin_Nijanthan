import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Extra Curricular', id: 'extracurricular' },
    { name: 'Education', id: 'education' },
    { name: 'Project', id: 'project' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`py-3 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg border-bottom' 
            : 'bg-white bg-opacity-95'
        }`}
        style={{ 
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '2px solid #e9ecef' : 'none'
        }}
      >
        <Container fluid className="position-relative">
          {/* Logo - Always visible on the left */}
          <Navbar.Brand 
            href="#home" 
            className="d-flex align-items-center position-absolute top-50 translate-middle-y"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            style={{ cursor: 'pointer', zIndex: 1050, left: '10px' }}
          >
            <img 
              src="/groundbreaker-svgrepo-com.svg" 
              alt="Logo" 
              width="40" 
              height="40"
              style={{ filter: 'brightness(0) saturate(100%) invert(0%)' }}
            />
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="border-0 shadow-none"
          />
          
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center w-100">
            <Nav className="gap-4 gap-lg-5">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`
                    fw-semibold fs-5 text-decoration-none position-relative px-3 py-2
                    transition-all duration-300 rounded-pill
                    ${activeSection === item.id 
                      ? 'text-primary bg-primary bg-opacity-10 shadow-sm' 
                      : 'text-dark hover-fade'
                    }
                  `}
                  style={{
                    transition: 'all 0.3s ease',
                    textDecoration: 'underline',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '2px',
                    textDecorationColor: activeSection === item.id ? '#0d6efd' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.opacity = '0.3';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.textDecorationColor = '#6c757d';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0px)';
                      e.target.style.textDecorationColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span 
                      className="position-absolute top-100 start-50 translate-middle-x"
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#0d6efd',
                        borderRadius: '50%',
                        marginTop: '4px'
                      }}
                    />
                  )}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Custom CSS for additional styling */}
      <style jsx>{`
        .hover-fade:hover {
          opacity: 0.3 !important;
          transform: translateY(-2px) !important;
        }
        
        .navbar-toggler:focus {
          box-shadow: none !important;
        }
        
        .nav-link {
          letter-spacing: 0.5px;
        }
        
        @media (max-width: 991.98px) {
          .nav-link {
            text-align: center;
            margin: 0.25rem 0;
            border-radius: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;