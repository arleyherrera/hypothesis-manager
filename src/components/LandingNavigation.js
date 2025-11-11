import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'react-bootstrap-icons';
import ThemeToggle from './ThemeToggle';

const LandingNavigation = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar expand="lg" className="landing-navbar" fixed="top">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <Lightbulb size={28} className="me-2 text-primary" />
          <span className="fw-bold fs-5 text-primary">Lean Startup Assistant</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#features" 
              className="text-dark fw-medium mx-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Funciones
            </Nav.Link>
            <Nav.Link 
              href="#how-it-works"
              className="text-dark fw-medium mx-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
            >
              Cómo Funciona
            </Nav.Link>
            <Nav.Link 
              href="#benefits"
              className="text-dark fw-medium mx-2"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('benefits');
              }}
            >
              Beneficios
            </Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center">
            <div className="me-3">
              <ThemeToggle />
            </div>
            <div className="auth-buttons">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="auth-btn-login"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
              <Button 
                variant="light" 
                size="sm"
                className="auth-btn-register"
                onClick={handleRegister}
              >
                Registrarse
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LandingNavigation;