import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BoxArrowInRight, 
  ExclamationTriangle, 
  EnvelopeFill, 
  LockFill, 
  EyeFill, 
  EyeSlashFill,
  Lightbulb,
  CheckCircleFill,
  XCircleFill
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuth();

  const FORM_FIELDS = {
    email: { type: 'email', name: 'email', placeholder: 'nombre@ejemplo.com', icon: <EnvelopeFill className="text-muted" size={16} /> },
    password: { type: 'password', name: 'password', placeholder: 'Ingrese su contraseña', icon: <LockFill className="text-muted" size={16} /> }
  };

  const AUTH_MESSAGES = {
    LOGIN_ERROR_DEFAULT: 'Error al iniciar sesión. Verifique sus credenciales.',
    LOGIN_ERROR_NO_FUNCTION: 'Error: Función de login no disponible'
  };

  useEffect(() => {
    clearError && clearError();
    return () => clearError && clearError();
  }, [clearError]);

  // Validar email
  const validateEmail = (email) => {
    if (!email) {
      return 'El correo electrónico es requerido';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Por favor ingrese un correo electrónico válido';
    }
    return null;
  };

  // Validar contraseña
  const validatePassword = (password) => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  // Validar todo el formulario
  const validateForm = () => {
    const errors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validar campo individual cuando pierde el foco
  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    let error = null;
    if (fieldName === 'email') {
      error = validateEmail(formData.email);
    } else if (fieldName === 'password') {
      error = validatePassword(formData.password);
    }
    
    setValidationErrors({
      ...validationErrors,
      [fieldName]: error
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo si ya fue tocado
    if (touched[name]) {
      let error = null;
      if (name === 'email') {
        error = validateEmail(value);
      } else if (name === 'password') {
        error = validatePassword(value);
      }
      
      setValidationErrors({
        ...validationErrors,
        [name]: error
      });
    }
    
    // Limpiar error general al escribir
    if (localError) {
      setLocalError(null);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setTouched({ email: true, password: true });
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setLocalError(null);
    
    try {
      if (login) {
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        setLocalError(AUTH_MESSAGES.LOGIN_ERROR_NO_FUNCTION);
      }
    } catch (err) {
      // Manejar diferentes tipos de errores
      if (err.response?.status === 401) {
        setLocalError('Correo electrónico o contraseña incorrectos');
      } else if (err.response?.status === 404) {
        setLocalError('No existe una cuenta con este correo electrónico');
      } else if (err.response?.data?.message) {
        setLocalError(err.response.data.message);
      } else {
        setLocalError(AUTH_MESSAGES.LOGIN_ERROR_DEFAULT);
      }
    } finally {
      setLoading(false);
    }
  };

  const displayError = authError || localError;

  const renderLogo = () => (
    <div className="text-center mb-4">
      <div className="auth-logo d-inline-block p-3 rounded-circle bg-primary">
        <Lightbulb className="text-white" size={32} />
      </div>
      <h2 className="auth-title mt-3">¡Bienvenido de nuevo!</h2>
      <p className="auth-subtitle text-muted">Inicia sesión para continuar con Lean Startup Assistant</p>
    </div>
  );

  const renderError = () => displayError && (
    <Alert variant="danger" className="d-flex align-items-center mb-4 border-0">
      <ExclamationTriangle className="me-2 flex-shrink-0" size={20} />
      <div>{displayError}</div>
    </Alert>
  );

  const renderFieldError = (fieldName) => {
    if (touched[fieldName] && validationErrors[fieldName]) {
      return (
        <Form.Text className="text-danger d-flex align-items-center mt-1">
          <XCircleFill className="me-1" size={12} />
          {validationErrors[fieldName]}
        </Form.Text>
      );
    }
    return null;
  };

  const renderFieldSuccess = (fieldName) => {
    if (touched[fieldName] && !validationErrors[fieldName] && formData[fieldName]) {
      return (
        <Form.Text className="text-success d-flex align-items-center mt-1">
          <CheckCircleFill className="me-1" size={12} />
          Válido
        </Form.Text>
      );
    }
    return null;
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "bg-light border-start-0";
    if (!touched[fieldName]) return baseClass;
    if (validationErrors[fieldName]) return `${baseClass} is-invalid`;
    if (formData[fieldName]) return `${baseClass} is-valid`;
    return baseClass;
  };

  const renderInputField = (field, showToggle = false) => (
    <InputGroup className={touched[field.name] && validationErrors[field.name] ? 'has-validation' : ''}>
      <InputGroup.Text className="bg-light border-end-0">{field.icon}</InputGroup.Text>
      <Form.Control
        type={field.name === 'password' && showPassword ? 'text' : field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        onBlur={() => handleBlur(field.name)}
        placeholder={field.placeholder}
        className={getInputClassName(field.name) + (showToggle ? ' border-end-0' : '')}
        required
        isInvalid={touched[field.name] && !!validationErrors[field.name]}
        isValid={touched[field.name] && !validationErrors[field.name] && !!formData[field.name]}
      />
      {showToggle && (
        <InputGroup.Text 
          className="bg-light border-start-0 cursor-pointer"
          onClick={togglePasswordVisibility}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? <EyeSlashFill className="text-muted" size={16} /> : <EyeFill className="text-muted" size={16} />}
        </InputGroup.Text>
      )}
    </InputGroup>
  );

  const renderEmailField = () => (
    <Form.Group className="mb-4">
      <Form.Label>Correo Electrónico</Form.Label>
      {renderInputField(FORM_FIELDS.email)}
      {renderFieldError('email')}
      {renderFieldSuccess('email')}
    </Form.Group>
  );

  const renderPasswordField = () => (
    <Form.Group className="mb-4">
      <div className="d-flex justify-content-between">
        <Form.Label>Contraseña</Form.Label>
        <Link to="/forgot-password" className="text-decoration-none small"></Link>
      </div>
      {renderInputField(FORM_FIELDS.password, true)}
      {renderFieldError('password')}
      {renderFieldSuccess('password')}
    </Form.Group>
  );

  const renderRememberMe = () => (
    <Form.Group className="mb-4">
      <Form.Check type="checkbox" id="rememberMe" label="Mantener sesión iniciada" className="text-muted" />
    </Form.Group>
  );

  const renderSubmitButton = () => (
    <div className="d-grid gap-2 mb-4">
      <Button 
        variant="primary" 
        type="submit" 
        size="lg" 
        className="py-2" 
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Iniciando sesión...
          </>
        ) : (
          <>
            <BoxArrowInRight className="me-2" size={18} />
            Iniciar Sesión
          </>
        )}
      </Button>
    </div>
  );

  const renderRegisterLink = () => (
    <div className="text-center">
      <p className="mb-0 text-muted">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="text-decoration-none fw-semibold">Crear cuenta</Link>
      </p>
    </div>
  );

  const renderForm = () => (
    <Form onSubmit={handleLoginSubmit} noValidate>
      {renderEmailField()}
      {renderPasswordField()}
      {renderRememberMe()}
      {renderSubmitButton()}
      {renderRegisterLink()}
    </Form>
  );

  const renderFooter = () => (
    <div className="text-center mt-4">
      <p className="text-muted small mb-0">
        © {new Date().getFullYear()} Lean Startup Assistant. Todos los derechos reservados.
      </p>
    </div>
  );

  return (
    <Container className="auth-container">
      <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Col md={6} lg={5}>
          {renderLogo()}
          <Card className="shadow border-0 login-card">
            <Card.Body className="p-4 p-md-5">
              {renderError()}
              {renderForm()}
            </Card.Body>
          </Card>
          {renderFooter()}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;