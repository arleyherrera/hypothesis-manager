// src/components/Navigation.js
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lightbulb, FileText, BoxArrowRight, PersonGear, PlusCircleFill, PersonPlus } from 'react-bootstrap-icons';
import { getCurrentUser, logout } from '../../services/authService';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const NAV_CONFIG = {
    BRAND_NAME: 'Lean Startup Assistant',
    BRAND_SHORT: 'LSA',
    ROUTES: {
      HOME: '/',
      DASHBOARD: '/dashboard',
      CREATE: '/create',
      LOGIN: '/login',
      REGISTER: '/register',
      PROFILE: '/profile'
    }
  };

  // Efecto para manejar el scroll y agregar sombra al navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar navbar al cambiar de ruta
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  // Cerrar navbar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && expanded) {
        setExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expanded]);

  const handleLogout = useCallback(() => {
    logout();
    navigate(NAV_CONFIG.ROUTES.HOME);
  }, [navigate]);

  const handleNavSelect = useCallback(() => {
    setExpanded(false);
  }, []);

  const isActiveRoute = (path) => location.pathname === path;

  // Función para obtener las iniciales del usuario
  const getUserInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const renderBrand = () => (
    <Navbar.Brand
      as={Link}
      to={currentUser ? NAV_CONFIG.ROUTES.DASHBOARD : NAV_CONFIG.ROUTES.HOME}
      className="d-flex align-items-center"
      aria-label={`${NAV_CONFIG.BRAND_NAME} - Ir al inicio`}
    >
      <Lightbulb className="me-2" size={24} aria-hidden="true" />
      <span className="d-none d-md-inline">{NAV_CONFIG.BRAND_NAME}</span>
      <span className="d-inline d-md-none fw-bold">{NAV_CONFIG.BRAND_SHORT}</span>
    </Navbar.Brand>
  );

  // Componente Avatar con iniciales - accesible
  const UserAvatar = ({ name, size = 32 }) => {
    const initials = getUserInitials(name);
    return (
      <div
        className="user-avatar d-inline-flex align-items-center justify-content-center rounded-circle bg-light text-primary fw-bold me-2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size * 0.4}px`,
          border: '2px solid rgba(255, 255, 255, 0.3)'
        }}
        role="img"
        aria-label={`Avatar de ${name}`}
      >
        {initials}
      </div>
    );
  };

  const renderAuthenticatedNav = () => (
    <>
      <Nav className="me-auto">
        <Nav.Link
          as={Link}
          to={NAV_CONFIG.ROUTES.DASHBOARD}
          active={isActiveRoute(NAV_CONFIG.ROUTES.DASHBOARD)}
          className={`nav-link-custom d-flex align-items-center position-relative ${isActiveRoute(NAV_CONFIG.ROUTES.DASHBOARD) ? 'active' : ''}`}
          onClick={handleNavSelect}
        >
          <FileText className="me-2" size={18} />
          Mis Hipotesis
        </Nav.Link>
      </Nav>
      <Nav className="d-flex align-items-center gap-2">
        <Button
          as={Link}
          to={NAV_CONFIG.ROUTES.CREATE}
          variant="light"
          size="sm"
          className="d-flex align-items-center fw-semibold me-2"
          onClick={handleNavSelect}
        >
          <PlusCircleFill className="me-1" size={16} />
          <span className="d-none d-lg-inline">Nueva Hipotesis</span>
          <span className="d-inline d-lg-none">Nueva</span>
        </Button>

        <ThemeToggle variant="icon" className="me-2" />

        <NavDropdown
          title={
            <span className="d-flex align-items-center">
              <UserAvatar name={currentUser.name} size={32} />
              <span className="text-white d-none d-md-inline">{currentUser.name}</span>
            </span>
          }
          id="user-dropdown"
          align="end"
          className="user-dropdown"
        >
          <NavDropdown.Item as={Link} to={NAV_CONFIG.ROUTES.PROFILE} onClick={handleNavSelect}>
            <PersonGear className="me-2" size={18} />
            Mi Perfil
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>
            <BoxArrowRight className="me-2" size={18} />
            Cerrar Sesion
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );

  const renderUnauthenticatedNav = () => (
    <>
      <Nav className="ms-auto d-flex align-items-center gap-2">
        <Nav.Link as={Link} to={NAV_CONFIG.ROUTES.LOGIN} className="text-white" onClick={handleNavSelect}>
          Iniciar Sesion
        </Nav.Link>

        <Button
          as={Link}
          to={NAV_CONFIG.ROUTES.REGISTER}
          variant="light"
          size="sm"
          className="d-flex align-items-center fw-semibold"
          onClick={handleNavSelect}
        >
          <PersonPlus className="me-1" size={16} />
          <span className="d-none d-sm-inline">Comenzar Gratis</span>
          <span className="d-inline d-sm-none">Registrarse</span>
        </Button>

        <ThemeToggle variant="icon" className="ms-2" />
      </Nav>
    </>
  );

  const renderNavContent = () => currentUser ? renderAuthenticatedNav() : renderUnauthenticatedNav();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}
    >
      <Container>
        {renderBrand()}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {renderNavContent()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
