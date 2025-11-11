// src/components/layout/LandingPage.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  BoxSeam,
  GraphUp,
  JournalText,
  ArrowRepeat,
  CheckCircleFill,
  PersonPlus,
  BoxArrowInRight,
  Rocket,
  Cpu,
  PeopleFill
} from 'react-bootstrap-icons';

const LandingPage = () => {
  // Características principales
  const features = [
    {
      icon: <Lightbulb size={40} className="text-primary" />,
      title: 'Gestión de Hipótesis',
      description: 'Crea y gestiona hipótesis de negocio siguiendo la metodología Lean Startup'
    },
    {
      icon: <Cpu size={40} className="text-success" />,
      title: 'IA Integrada',
      description: 'Genera artefactos de negocio automáticamente con inteligencia artificial'
    },
    {
      icon: <BoxSeam size={40} className="text-info" />,
      title: 'Ciclo Build-Measure-Learn',
      description: 'Sigue las fases: Construir, Medir, Aprender, Pivotar e Iterar'
    },
    {
      icon: <GraphUp size={40} className="text-warning" />,
      title: 'Métricas y Análisis',
      description: 'Rastrea el progreso de tus hipótesis y toma decisiones basadas en datos'
    }
  ];

  // Fases del proceso
  const phases = [
    { icon: <BoxSeam size={24} />, name: 'Construir', color: 'primary' },
    { icon: <GraphUp size={24} />, name: 'Medir', color: 'success' },
    { icon: <JournalText size={24} />, name: 'Aprender', color: 'info' },
    { icon: <ArrowRepeat size={24} />, name: 'Pivotar', color: 'warning' },
    { icon: <Rocket size={24} />, name: 'Iterar', color: 'danger' }
  ];

  // Beneficios
  const benefits = [
    'Validación rápida de ideas de negocio',
    'Reduce el riesgo de fracaso empresarial',
    'Artefactos profesionales generados por IA',
    'Metodología probada y estructurada',
    'Interfaz intuitiva y fácil de usar',
    'Totalmente gratuito y sin límites'
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section text-white">
        <Container>
          <Row className="align-items-center" style={{ minHeight: '85vh' }}>
            <Col lg={6} className="text-center text-lg-start">
              <div className="mb-4">
                <Lightbulb size={80} className="text-warning mb-3" />
              </div>
              <h1 className="display-3 fw-bold mb-4">
                Lean Startup Assistant
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
                Valida tus ideas de negocio con la metodología Lean Startup.
                Gestiona hipótesis, genera artefactos con IA y toma decisiones basadas en datos.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                >
                  <PersonPlus className="me-2" size={20} />
                  Comenzar Gratis
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3"
                >
                  <BoxArrowInRight className="me-2" size={20} />
                  Iniciar Sesión
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-illustration p-5">
                <Card className="shadow-lg border-0 bg-white text-dark">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <Lightbulb size={32} className="text-primary me-3" />
                      <h5 className="mb-0 fw-bold">Hipótesis de Ejemplo</h5>
                    </div>
                    <p className="text-muted mb-3">
                      Creemos que los emprendedores necesitan una herramienta para validar sus ideas de negocio...
                    </p>
                    <div className="d-flex gap-2 mb-3">
                      <span className="badge bg-primary">Construir</span>
                      <span className="badge bg-success">Con IA</span>
                    </div>
                    <div className="text-success">
                      <CheckCircleFill className="me-2" />
                      5 artefactos generados
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Características Principales</h2>
            <p className="lead text-muted">
              Todo lo que necesitas para validar tus ideas de negocio
            </p>
          </div>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm hover-card">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-5">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Metodología Lean Startup</h2>
            <p className="lead text-muted">
              Sigue el ciclo Build-Measure-Learn para validar tus hipótesis
            </p>
          </div>
          <Row className="g-4 justify-content-center">
            {phases.map((phase, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <Card className={`h-100 border-0 shadow-sm text-center bg-${phase.color} text-white`}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                    <div className="mb-3">
                      {phase.icon}
                    </div>
                    <h6 className="fw-bold mb-0">{phase.name}</h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-5 bg-light">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-5 fw-bold mb-4">¿Por qué Lean Startup Assistant?</h2>
              <p className="lead text-muted mb-4">
                Nuestra plataforma te ayuda a validar tus ideas de negocio de forma rápida
                y eficiente, reduciendo el riesgo y aumentando tus posibilidades de éxito.
              </p>
              <div className="d-flex align-items-center mb-3 p-3 bg-white rounded shadow-sm">
                <PeopleFill size={32} className="text-primary me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Para Emprendedores</h6>
                  <p className="text-muted mb-0 small">Valida tu startup antes de invertir recursos</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3 p-3 bg-white rounded shadow-sm">
                <Cpu size={32} className="text-success me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Potenciado por IA</h6>
                  <p className="text-muted mb-0 small">Genera artefactos profesionales automáticamente</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Beneficios Clave:</h5>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="d-flex align-items-start mb-3">
                      <CheckCircleFill className="text-success me-3 mt-1 flex-shrink-0" size={20} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 cta-section text-white">
        <Container className="py-5 text-center">
          <Rocket size={60} className="mb-4" />
          <h2 className="display-4 fw-bold mb-4">¿Listo para comenzar?</h2>
          <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Únete a los emprendedores que están validando sus ideas de negocio
            de forma inteligente con Lean Startup Assistant.
          </p>
          <Button
            as={Link}
            to="/register"
            variant="light"
            size="lg"
            className="px-5 py-3 fw-semibold"
          >
            <PersonPlus className="me-2" size={24} />
            Crear Cuenta Gratis
          </Button>
          <div className="mt-4">
            <small className="text-white-50">
              Sin tarjeta de crédito requerida • Acceso completo • Totalmente gratis
            </small>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <Lightbulb size={24} className="me-2" />
                <span className="fw-semibold">Lean Startup Assistant</span>
              </div>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <small className="text-white-50">
                © {new Date().getFullYear()} Lean Startup Assistant. Todos los derechos reservados.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
