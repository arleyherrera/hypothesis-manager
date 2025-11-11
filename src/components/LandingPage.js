import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  BarChart,
  Bullseye,
  ArrowRightCircle,
  CheckCircle,
  Rocket,
  GraphUp,
  People,
  Clock,
  Shield,
  Award,
  ArrowRight,
  Star,
  StarFill,
  Quote,
  Play,
  Cpu,
  Lightbulb as BrainIcon,
  ChevronDown,
  ArrowUp,
  Lightning,
  Activity,
  PlayCircle,
  MousePointer,
  Eye,
  Heart,
  HandThumbsUp
} from 'react-bootstrap-icons';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const [statsCount, setStatsCount] = useState({ users: 0, ideas: 0, success: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Animación de contadores
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setStatsCount(prev => ({
        users: Math.min(prev.users + 12, 1200),
        ideas: Math.min(prev.ideas + 25, 5000),
        success: Math.min(prev.success + 3, 89)
      }));
    }, 50);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  // Rotación automática de cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleLearnMore = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Lightbulb size={32} />,
      title: "BUILD",
      description: "Construye productos mínimos viables basados en tus hipótesis de negocio",
      color: "primary"
    },
    {
      icon: <BarChart size={32} />,
      title: "MEASURE",
      description: "Mide y recopila datos reales de tus experimentos con usuarios",
      color: "success"
    },
    {
      icon: <Bullseye size={32} />,
      title: "LEARN",
      description: "Aprende de los resultados y toma decisiones basadas en evidencia",
      color: "secondary"
    }
  ];

  const benefits = [
    {
      icon: <GraphUp size={24} />,
      title: "Reduce el Riesgo",
      description: "Valida ideas antes de invertir tiempo y dinero"
    },
    {
      icon: <Clock size={24} />,
      title: "Acelera el Desarrollo",
      description: "Llega más rápido al mercado con productos validados"
    },
    {
      icon: <People size={24} />,
      title: "Enfoque en el Cliente",
      description: "Construye lo que realmente necesitan tus usuarios"
    },
    {
      icon: <Shield size={24} />,
      title: "Decisiones Basadas en Datos",
      description: "Elimina las suposiciones y usa evidencia real"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Define tu Hipótesis",
      description: "Identifica el problema y crea hipótesis claras sobre tu solución"
    },
    {
      number: "02",
      title: "Crea Experimentos",
      description: "Genera artefactos y experimenta con usuarios reales usando IA"
    },
    {
      number: "03",
      title: "Valida y Pivota",
      description: "Analiza resultados y decide si continuar, pivotar o iterar"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        {/* Background Elements */}
        <div className="hero-bg-elements">
          <div className="floating-element element-1">
            <Lightning className="text-primary opacity-25" size={24} />
          </div>
          <div className="floating-element element-2">
            <Bullseye className="text-success opacity-25" size={20} />
          </div>
          <div className="floating-element element-3">
            <ArrowUp className="text-warning opacity-25" size={28} />
          </div>
        </div>

        <Container>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={6}>
              <div className={`hero-content ${isVisible ? 'fade-in-up' : ''}`}>
                <div className="hero-badges mb-4 d-flex flex-wrap gap-2">
                  <Badge bg="primary-subtle" text="primary" className="px-3 py-2 rounded-pill fs-6">
                    <Rocket size={16} className="me-2" />
                    Metodología Lean Startup
                  </Badge>
                  <Badge bg="success-subtle" text="success" className="px-3 py-2 rounded-pill fs-6">
                    <Lightning size={16} className="me-2" />
                    Potenciado por IA
                  </Badge>
                </div>
                
                <h1 className="hero-title display-3 fw-bold mb-4 lh-1">
                  <span className="text-gradient">Lean Startup Assistant</span>
                </h1>
                
                <p className="hero-subtitle lead text-muted mb-4 fs-5">
                  La plataforma definitiva para aplicar Lean Startup de manera sistemática. 
                  Construye, mide y aprende con hipótesis validadas por IA.
                </p>
                
                {/* Stats dinámicos */}
                <div className="hero-stats mb-4 p-4 bg-white rounded-4 shadow-sm">
                  <Row>
                    <Col xs={4}>
                      <div className="stat-item text-center">
                        <div className="stat-number display-6 fw-bold text-primary mb-0">
                          {statsCount.users}+
                        </div>
                        <div className="stat-label small text-muted">Emprendedores</div>
                        <ProgressBar 
                          variant="primary" 
                          now={statsCount.users / 12} 
                          className="mt-1" 
                          style={{height: '3px'}}
                        />
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item text-center">
                        <div className="stat-number display-6 fw-bold text-success mb-0">
                          {statsCount.ideas}+
                        </div>
                        <div className="stat-label small text-muted">Ideas Validadas</div>
                        <ProgressBar 
                          variant="success" 
                          now={statsCount.ideas / 50} 
                          className="mt-1" 
                          style={{height: '3px'}}
                        />
                      </div>
                    </Col>
                    <Col xs={4}>
                      <div className="stat-item text-center">
                        <div className="stat-number display-6 fw-bold text-warning mb-0">
                          {statsCount.success}%
                        </div>
                        <div className="stat-label small text-muted">Tasa de Éxito</div>
                        <ProgressBar 
                          variant="warning" 
                          now={statsCount.success} 
                          className="mt-1" 
                          style={{height: '3px'}}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                
                <div className="hero-actions d-flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    className="btn-gradient px-5 py-3 d-flex align-items-center border-0 shadow-lg"
                    onClick={handleGetStarted}
                  >
                    <PlayCircle className="me-2" size={20} />
                    Comenzar Ahora
                    <ArrowRightCircle className="ms-2" size={20} />
                  </Button>
                  
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    className="px-5 py-3 d-flex align-items-center border-2"
                    onClick={handleLearnMore}
                  >
                    <Eye className="me-2" size={18} />
                    Ver Demo
                  </Button>
                </div>
                
                {/* Social Proof */}
                <div className="social-proof mt-4 d-flex align-items-center gap-3 flex-wrap">
                  <div className="d-flex align-items-center">
                    <div className="rating-stars me-2">
                      {[...Array(5)].map((_, i) => (
                        <StarFill key={i} className="text-warning me-1" size={14} />
                      ))}
                    </div>
                    <span className="small text-muted">4.9/5 de satisfacción</span>
                  </div>
                  <div className="divider mx-2">|</div>
                  <div className="d-flex align-items-center">
                    <Heart className="text-danger me-2" size={16} />
                    <span className="small text-muted">Usado por +500 startups</span>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <div className="hero-visual position-relative">
                {/* Interactive Dashboard Preview */}
                <div className="dashboard-preview bg-white rounded-4 shadow-lg p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="status-dot bg-success me-2"></div>
                      <span className="small fw-medium">Dashboard en Vivo</span>
                    </div>
                    <Badge bg="primary-subtle" text="primary" className="px-2 py-1">
                      IA Activa
                    </Badge>
                  </div>
                  
                  <Row className="g-3">
                    <Col xs={12}>
                      <div className="mini-chart bg-light rounded p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="small fw-medium">Hipótesis Validadas</span>
                          <ArrowUp size={16} className="text-success" />
                        </div>
                        <div className="progress-bars">
                          <ProgressBar className="mb-1" style={{height: '4px'}}>
                            <ProgressBar variant="success" now={85} />
                            <ProgressBar variant="warning" now={10} />
                            <ProgressBar variant="danger" now={5} />
                          </ProgressBar>
                          <div className="d-flex justify-content-between">
                            <small className="text-muted">Éxito: 85%</small>
                            <small className="text-muted">Total: 127</small>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="metric-card bg-primary-subtle rounded p-2 text-center">
                        <Activity size={20} className="text-primary mb-1" />
                        <div className="fw-bold small">24</div>
                        <div className="tiny text-muted">Experimentos</div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="metric-card bg-success-subtle rounded p-2 text-center">
                        <HandThumbsUp size={20} className="text-success mb-1" />
                        <div className="fw-bold small">91%</div>
                        <div className="tiny text-muted">Satisfacción</div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Interactive floating cards */}
                <div className="floating-cards-modern">
                  {[
                    {
                      icon: <Lightbulb size={32} className="text-primary" />,
                      title: "Hipótesis Inteligente",
                      description: "IA genera hipótesis basadas en datos del mercado",
                      active: activeCard === 0,
                      color: "primary",
                      progress: 95
                    },
                    {
                      icon: <BarChart size={32} className="text-success" />,
                      title: "Experimentos Guiados",
                      description: "Metodología probada para validar rápidamente",
                      active: activeCard === 1,
                      color: "success", 
                      progress: 87
                    },
                    {
                      icon: <Bullseye size={32} className="text-info" />,
                      title: "Insights Automáticos",
                      description: "Análisis predictivo de resultados",
                      active: activeCard === 2,
                      color: "info",
                      progress: 92
                    }
                  ].map((card, index) => (
                    <Card 
                      key={index}
                      className={`floating-card-modern card-${index + 1} ${card.active ? 'active' : ''} border-0 shadow-lg`}
                      onMouseEnter={() => setActiveCard(index)}
                    >
                      <Card.Body className="p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          {card.icon}
                          <Badge bg={`${card.color}-subtle`} text={card.color} className="px-2 py-1">
                            {card.progress}%
                          </Badge>
                        </div>
                        <h6 className="fw-bold mb-2">{card.title}</h6>
                        <p className="small text-muted mb-3">{card.description}</p>
                        <ProgressBar 
                          variant={card.color} 
                          now={card.progress} 
                          style={{height: '3px'}}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title display-5 fw-bold mb-4">
                Metodología <span className="text-primary">Build-Measure-Learn</span>
              </h2>
              <p className="section-subtitle lead text-muted mx-auto" style={{maxWidth: '600px'}}>
                Aplicamos la metodología probada por miles de startups exitosas, 
                potenciada con inteligencia artificial para acelerar tu aprendizaje.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="feature-card h-100 border-0 shadow-sm">
                  <Card.Body className="text-center p-4">
                    <div className={`feature-icon bg-${feature.color}-subtle text-${feature.color} rounded-circle d-inline-flex align-items-center justify-content-center mb-4`}
                         style={{width: '80px', height: '80px'}}>
                      {feature.icon}
                    </div>
                    <h4 className="feature-title fw-bold mb-3">{feature.title}</h4>
                    <p className="feature-description text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title display-5 fw-bold mb-4">
                ¿Por qué Hypothesis Manager?
              </h2>
              <p className="section-subtitle lead text-muted">
                Reduce el riesgo y acelera el éxito de tus proyectos
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col md={6} lg={3} key={index}>
                <div className="benefit-item text-center">
                  <div className="benefit-icon text-primary mb-3">
                    {benefit.icon}
                  </div>
                  <h5 className="benefit-title fw-semibold mb-3">{benefit.title}</h5>
                  <p className="benefit-description text-muted small">{benefit.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="how-it-works-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title display-5 fw-bold mb-4">
                Cómo Funciona
              </h2>
              <p className="section-subtitle lead text-muted">
                Tres pasos simples para validar tus ideas de negocio
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {steps.map((step, index) => (
              <Col md={4} key={index}>
                <div className="step-item">
                  <div className="step-number-container mb-4">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                         style={{width: '60px', height: '60px', fontSize: '1.25rem'}}>
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="step-connector d-none d-md-block">
                        <ArrowRight className="text-muted" size={24} />
                      </div>
                    )}
                  </div>
                  <h4 className="step-title fw-bold mb-3">{step.title}</h4>
                  <p className="step-description text-muted">{step.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Technologies Section */}
      <section className="technologies-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title display-6 fw-bold mb-4">
                Potenciado por <span className="text-primary">IA Avanzada</span>
              </h2>
              <p className="section-subtitle text-muted">
                Utilizamos las últimas tecnologías para acelerar tu proceso de validación
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 align-items-center justify-content-center">
            <Col xs={6} md={3} className="text-center">
              <div className="tech-item">
                <BrainIcon size={48} className="text-primary mb-3" />
                <h6 className="fw-semibold">OpenAI GPT</h6>
                <small className="text-muted">Generación inteligente</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="tech-item">
                <Cpu size={48} className="text-primary mb-3" />
                <h6 className="fw-semibold">Machine Learning</h6>
                <small className="text-muted">Análisis predictivo</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="tech-item">
                <BarChart size={48} className="text-primary mb-3" />
                <h6 className="fw-semibold">Analytics</h6>
                <small className="text-muted">Métricas en tiempo real</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="tech-item">
                <Shield size={48} className="text-primary mb-3" />
                <h6 className="fw-semibold">Seguridad</h6>
                <small className="text-muted">Datos protegidos</small>
              </div>
            </Col>
          </Row>
        </Container>
      </section>


      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <div className="cta-content">
                <Award size={48} className="mb-4 opacity-75" />
                <h2 className="cta-title display-5 fw-bold mb-4">
                  ¿Listo para Validar tus Ideas?
                </h2>
                <p className="cta-subtitle lead mb-4 opacity-90">
                  Únete a emprendedores que ya están aplicando Lean Startup de manera sistemática
                </p>
                <div className="cta-actions">
                  <Button 
                    size="lg" 
                    variant="light"
                    className="px-5 py-3 fw-semibold"
                    onClick={handleGetStarted}
                  >
                    Comenzar Gratis
                    <ArrowRightCircle className="ms-2" size={20} />
                  </Button>
                </div>
                <p className="small mt-3 opacity-75 mb-0">
                  <CheckCircle size={16} className="me-2" />
                  Sin tarjeta de crédito • Setup en 2 minutos • Soporte incluido
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;