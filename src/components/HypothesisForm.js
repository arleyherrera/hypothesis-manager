import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PencilSquare, 
  ExclamationTriangle, 
  CheckCircle, 
  ArrowLeft, 
  SendCheck, 
  PatchQuestion, 
  LightbulbFill, 
  PeopleFill, 
  Trophy 
} from 'react-bootstrap-icons';
import { saveHypothesis } from '../services/hypothesisService';

const HypothesisForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    problem: '',
    name: '',
    solution: '',
    customerSegment: '',
    valueProposition: '',
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const FORM_FIELDS = {
    problem: { 
      label: 'Problema', 
      placeholder: 'Describa detalladamente el problema que está observando. Sea específico: ¿Quién lo experimenta? ¿Cuándo ocurre? ¿Qué consecuencias tiene?', 
      helpText: '¿Qué dolor, frustración o necesidad no satisfecha experimenta su cliente objetivo? Mínimo 20 caracteres.', 
      icon: <PatchQuestion size={24} />, 
      color: 'primary' 
    },
    name: { 
      label: 'Nombre de la Hipótesis', 
      placeholder: 'Un nombre corto y descriptivo para identificar esta hipótesis', 
      helpText: 'Un título que resuma el problema y la solución propuesta' 
    },
    solution: { 
      label: 'Solución', 
      placeholder: 'Describa la solución que propone para resolver el problema identificado...', 
      helpText: '¿Cómo su producto o servicio resuelve específicamente el problema?', 
      icon: <LightbulbFill size={24} />, 
      color: 'success' 
    },
    customerSegment: { 
      label: 'Segmento de Clientes', 
      placeholder: 'Describa quiénes son sus clientes objetivo de manera específica...', 
      helpText: 'Sea específico: edad, ubicación, comportamientos, etc.', 
      icon: <PeopleFill size={24} />, 
      color: 'info' 
    },
    valueProposition: { 
      label: 'Propuesta de Valor', 
      placeholder: '¿Por qué los clientes elegirían su solución sobre otras alternativas?', 
      helpText: '¿Qué hace única a su solución? ¿Cuál es su ventaja competitiva?', 
      icon: <Trophy size={24} />, 
      color: 'warning' 
    }
  };

  const TOTAL_FIELDS = 5;
  const SUCCESS_REDIRECT_DELAY = 1500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormComplete = () => Object.values(formData).every(value => value);

  const getCompletionPercentage = () => {
    const filled = Object.values(formData).filter(value => value).length;
    return (filled / TOTAL_FIELDS) * 100;
  };

  const validateProblem = (problem) => {
    if (!problem || problem.trim().length < 20) {
      return 'El problema debe tener al menos 20 caracteres para ser suficientemente específico';
    }
    if (problem.split(/\s+/).length < 5) {
      return 'Por favor, describa el problema con más detalle (mínimo 5 palabras)';
    }
    return null;
  };

  const handleFormSubmit = async (formEvent) => {
    formEvent.preventDefault();
    const form = formEvent.currentTarget;
    
    // Validar problema específicamente
    const problemError = validateProblem(formData.problem);
    if (problemError) {
      setError(problemError);
      return;
    }
    
    if (!form.checkValidity()) {
      formEvent.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await saveHypothesis(formData);
      setSuccess(true);
      setTimeout(() => navigate('/'), SUCCESS_REDIRECT_DELAY);
    } catch (err) {
      setError('Error al guardar la hipótesis. Por favor, inténtelo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="mb-0 d-flex align-items-center">
        <PencilSquare className="me-2 text-primary" size={28} />
        Nueva Hipótesis
      </h2>
      <Link to="/">
        <Button variant="outline-secondary" className="d-flex align-items-center">
          <ArrowLeft className="me-2" size={16} />
          Volver
        </Button>
      </Link>
    </div>
  );

  const renderCardHeader = () => (
    <Card.Header className="bg-white py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <LightbulbFill className="text-warning me-2" size={24} />
          <h4 className="mb-0">Registrar Nueva Hipótesis</h4>
        </div>
        <div className="text-muted" style={{ width: '200px' }}>
          <small className="d-block mb-1">Progreso: {Math.round(getCompletionPercentage())}% completado</small>
          <ProgressBar 
            now={getCompletionPercentage()} 
            variant={getCompletionPercentage() === 100 ? "success" : "primary"} 
            style={{ height: '8px' }}
          />
        </div>
      </div>
    </Card.Header>
  );

  const renderAlert = (variant, icon, title, message) => (
    <Alert variant={variant} className="d-flex align-items-center mb-4">
      {icon}
      <div>
        <strong>{title}</strong> {message}
      </div>
    </Alert>
  );

  const renderSuccessAlert = () => renderAlert('success', <CheckCircle className="me-3" size={24} />, '¡Excelente!', 'Hipótesis guardada correctamente. Redirigiendo...');
  const renderErrorAlert = () => renderAlert('danger', <ExclamationTriangle className="me-3" size={24} />, 'Ha ocurrido un error', error);

  const renderFieldCard = (fieldName, rows) => {
    const field = FORM_FIELDS[fieldName];
    return (
      <Card className="h-100 shadow-sm border-0">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className={`bg-${field.color} rounded-circle p-2 me-3 text-white`}>{field.icon}</div>
            <Form.Label className="mb-0 fw-bold">{field.label}</Form.Label>
          </div>
          <Form.Control
            as="textarea"
            rows={rows}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className={fieldName === 'problem' ? 'form-control-lg' : ''}
          />
          <Form.Text className="text-muted d-block mt-2">{field.helpText}</Form.Text>
          <Form.Control.Feedback type="invalid">
            {fieldName === 'problem' ? 'El problema debe tener al menos 20 caracteres y 5 palabras' : 
             fieldName === 'solution' ? 'Por favor describa su solución propuesta' : 
             fieldName === 'customerSegment' ? 'Por favor identifique su segmento de clientes' : 
             'Por favor defina su propuesta de valor'}
          </Form.Control.Feedback>
        </Card.Body>
      </Card>
    );
  };

  const renderFieldPairs = () => (
    <>
      {/* PROBLEMA PRIMERO - Ocupa todo el ancho */}
      <Row className="mb-4">
        <Col md={12}>
          <Card className="h-100 shadow-sm border-0 border-primary border-2">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary rounded-circle p-2 me-3 text-white">
                  <PatchQuestion size={24} />
                </div>
                <div>
                  <Form.Label className="mb-0 fw-bold">Problema</Form.Label>
                  <small className="text-primary d-block">Este es el punto de partida más importante</small>
                </div>
              </div>
              <Form.Control
                as="textarea"
                rows={5}
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Describa detalladamente el problema que está observando. Sea específico: ¿Quién lo experimenta? ¿Cuándo ocurre? ¿Qué consecuencias tiene?"
                required
                className="form-control-lg"
              />
              <Form.Text className="text-muted d-block mt-2">
                Un problema bien definido es la base de una hipótesis exitosa. Mínimo 20 caracteres.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                El problema debe tener al menos 20 caracteres para ser suficientemente específico.
              </Form.Control.Feedback>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Luego el nombre de la hipótesis */}
      <Row className="mb-4">
        <Col md={12}>
          <Form.Group>
            <Form.Label><strong>Nombre de la Hipótesis</strong></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Un nombre corto y descriptivo para identificar esta hipótesis"
              required
            />
            <Form.Text className="text-muted">
              Un título que resuma el problema y la solución propuesta
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre para su hipótesis.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      {/* Solución a la par con segmento */}
      <Row className="mb-4">
        <Col md={6}>{renderFieldCard('solution', 5)}</Col>
        <Col md={6}>{renderFieldCard('customerSegment', 5)}</Col>
      </Row>
      
      {/* Propuesta de valor sola */}
      <Row className="mb-4">
        <Col md={12}>{renderFieldCard('valueProposition', 4)}</Col>
      </Row>
    </>
  );

  const renderSubmitButton = () => (
    <div className="d-grid gap-2 mt-4">
      <Button 
        variant="primary" 
        type="submit" 
        size="lg"
        className="py-3"
        disabled={!isFormComplete() || loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span>Validando...</span>
          </>
        ) : (
          <>
            <SendCheck className="me-2" size={20} />
            Validar Hipótesis
          </>
        )}
      </Button>
      <div className="text-center mt-2">
        <small className="text-muted">Al validar, podrá generar artefactos Lean Startup para su hipótesis</small>
      </div>
    </div>
  );

  const renderForm = () => (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {renderFieldPairs()}
      {renderSubmitButton()}
    </Form>
  );

  return (
    <div className="fade-in">
      {renderHeader()}
      <Card className="mb-4 shadow-sm">
        {renderCardHeader()}
        <Card.Body className="p-4">
          {success && renderSuccessAlert()}
          {error && renderErrorAlert()}
          {renderForm()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default HypothesisForm;