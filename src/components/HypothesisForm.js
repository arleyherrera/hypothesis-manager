import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, ProgressBar, Modal, Spinner, Badge } from 'react-bootstrap';
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
  Trophy,
  Robot,
  Magic,
  Check2Circle
} from 'react-bootstrap-icons';
import { saveHypothesis } from '../services/hypothesisService';
import { generateHypothesisOptions } from '../services/aiService';

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
  
  // Estados para la generación con IA
  const [showAIModal, setShowAIModal] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiOptions, setAiOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [aiGenerated, setAiGenerated] = useState(false);

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
    
    // Si cambia el problema y ya se generó con IA, resetear
    if (name === 'problem' && aiGenerated) {
      setAiGenerated(false);
      setAiOptions([]);
      setSelectedOption(null);
    }
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

  const handleGenerateWithAI = async () => {
    const problemError = validateProblem(formData.problem);
    if (problemError) {
      setError(problemError);
      return;
    }
    
    setGeneratingAI(true);
    setError(null);
    setShowAIModal(true);
    
    try {
      const response = await generateHypothesisOptions(formData.problem);
      setAiOptions(response.options || []);
    } catch (err) {
      setError('Error al generar opciones con IA. Por favor, inténtelo de nuevo.');
      setShowAIModal(false);
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleConfirmAIOption = () => {
    if (selectedOption) {
      setFormData({
        problem: formData.problem, // Mantener el problema original
        name: selectedOption.name,
        solution: selectedOption.solution,
        customerSegment: selectedOption.customerSegment,
        valueProposition: selectedOption.valueProposition
      });
      setAiGenerated(true);
      setShowAIModal(false);
      setSelectedOption(null);
    }
  };

  const handleFormSubmit = async (formEvent) => {
    formEvent.preventDefault();
    const form = formEvent.currentTarget;
    
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
        <div className="d-flex align-items-center gap-3">
          {aiGenerated && (
            <Badge bg="success" className="px-3 py-2 d-flex align-items-center">
              <Robot className="me-1" size={16} />
              Generado con IA
            </Badge>
          )}
          <div className="text-muted" style={{ width: '200px' }}>
            <small className="d-block mb-1">Progreso: {Math.round(getCompletionPercentage())}% completado</small>
            <ProgressBar 
              now={getCompletionPercentage()} 
              variant={getCompletionPercentage() === 100 ? "success" : "primary"} 
              style={{ height: '8px' }}
            />
          </div>
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

  const renderProblemField = () => (
    <Row className="mb-4">
      <Col md={12}>
        <Card className="h-100 shadow-sm border-0 border-primary border-2">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-2 me-3 text-white">
                  <PatchQuestion size={24} />
                </div>
                <div>
                  <Form.Label className="mb-0 fw-bold">Problema</Form.Label>
                  <small className="text-primary d-block">Este es el punto de partida más importante</small>
                </div>
              </div>
              {/* Botón de generar con IA */}
              <Button
                variant="success"
                onClick={handleGenerateWithAI}
                disabled={!formData.problem || formData.problem.length < 20 || generatingAI}
                className="d-flex align-items-center"
              >
                <Magic className="me-2" size={16} />
                Generar con IA
              </Button>
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
            <div className="d-flex justify-content-between align-items-center mt-2">
              <Form.Text className="text-muted">
                Un problema bien definido es la base de una hipótesis exitosa. Mínimo 20 caracteres.
              </Form.Text>
              {formData.problem.length >= 20 && (
                <small className="text-success">
                  <Check2Circle className="me-1" size={14} />
                  Puede generar el resto con IA
                </small>
              )}
            </div>
            <Form.Control.Feedback type="invalid">
              El problema debe tener al menos 20 caracteres para ser suficientemente específico.
            </Form.Control.Feedback>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderFieldCard = (fieldName, rows) => {
    const field = FORM_FIELDS[fieldName];
    return (
      <Card className={`h-100 shadow-sm border-0 ${aiGenerated ? 'border-success' : ''}`}>
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
      {renderProblemField()}
      
      {/* Alerta informativa si se generó con IA */}
      {aiGenerated && (
        <Alert variant="info" className="mb-4 d-flex align-items-center">
          <Robot className="me-2" size={20} />
          <div>
            <strong>Campos generados con IA</strong> - Puede editarlos si lo desea antes de guardar.
          </div>
        </Alert>
      )}
      
      {/* Nombre de la hipótesis */}
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
              className={aiGenerated ? 'border-success' : ''}
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
      
      {/* Solución y segmento */}
      <Row className="mb-4">
        <Col md={6}>{renderFieldCard('solution', 5)}</Col>
        <Col md={6}>{renderFieldCard('customerSegment', 5)}</Col>
      </Row>
      
      {/* Propuesta de valor */}
      <Row className="mb-4">
        <Col md={12}>{renderFieldCard('valueProposition', 4)}</Col>
      </Row>
    </>
  );

  const renderAIModal = () => (
    <Modal 
      show={showAIModal} 
      onHide={() => !generatingAI && setShowAIModal(false)} 
      size="lg" 
      centered
      backdrop={generatingAI ? 'static' : true}
    >
      <Modal.Header closeButton={!generatingAI}>
        <Modal.Title className="d-flex align-items-center">
          <Robot className="me-2 text-success" size={24} />
          Opciones Generadas con IA
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {generatingAI ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" className="mb-3" />
            <p>Analizando el problema y generando opciones...</p>
          </div>
        ) : (
          <>
            <Alert variant="info" className="mb-4">
              <strong>Basándome en el problema identificado, he generado 3 enfoques diferentes.</strong> 
              <br />Seleccione el que mejor se adapte a su visión:
            </Alert>
            
            <div className="problem-reminder mb-4 p-3 bg-light rounded">
              <h6 className="text-primary mb-2">Problema:</h6>
              <p className="mb-0">{formData.problem}</p>
            </div>
            
            {aiOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`mb-3 cursor-pointer ${selectedOption === option ? 'border-success border-2' : ''}`}
                onClick={() => handleSelectOption(option)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h5 className="mb-3">{option.name}</h5>
                      <Row className="g-3">
                        <Col md={12}>
                          <div className="mb-2">
                            <Badge bg="success" className="mb-2">Solución</Badge>
                            <p className="mb-0 small">{option.solution}</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <Badge bg="info" className="mb-2">Segmento</Badge>
                            <p className="mb-0 small">{option.customerSegment}</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <Badge bg="warning" className="mb-2">Propuesta de Valor</Badge>
                            <p className="mb-0 small">{option.valueProposition}</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    {selectedOption === option && (
                      <Check2Circle className="text-success ms-3" size={24} />
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </>
        )}
      </Modal.Body>
      {!generatingAI && (
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAIModal(false)}>
            Cancelar
          </Button>
          <Button 
            variant="success" 
            onClick={handleConfirmAIOption}
            disabled={!selectedOption}
            className="d-flex align-items-center"
          >
            <Check2Circle className="me-2" size={16} />
            Usar Esta Opción
          </Button>
        </Modal.Footer>
      )}
    </Modal>
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
      {renderAIModal()}
    </div>
  );
};

export default HypothesisForm;