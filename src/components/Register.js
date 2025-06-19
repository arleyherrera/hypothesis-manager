import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container, InputGroup, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PersonPlus, 
  Check2Circle, 
  ExclamationTriangle, 
  EnvelopeFill, 
  LockFill, 
  PersonFill, 
  EyeFill, 
  EyeSlashFill,
  Lightbulb,
  CheckCircleFill,
  XCircleFill
} from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuth();

  useEffect(() => {
    clearError && clearError();
    return () => clearError && clearError();
  }, [clearError]);

  // Validaciones individuales
  const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return 'El nombre es requerido';
    }
    if (name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    return null;
  };

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

  const validatePassword = (password) => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Por favor confirme su contraseña';
    }
    if (confirmPassword !== password) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  };

  const validateForm = () => {
    const errors = {};
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;
    if (confirmError) errors.confirmPassword = confirmError;
    if (!acceptTerms) errors.terms = 'Debe aceptar los términos y condiciones';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    let error = null;
    switch (fieldName) {
      case 'name':
        error = validateName(formData.name);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'password':
        error = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.confirmPassword, formData.password);
        break;
      default:
        break;
    }
    
    setValidationErrors({
      ...validationErrors,
      [fieldName]: error
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Calcular la fortaleza de la contraseña
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      let error = null;
      switch (name) {
        case 'name':
          error = validateName(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          // También revalidar confirmPassword si ya fue tocada
          if (touched.confirmPassword && formData.confirmPassword) {
            const confirmError = validateConfirmPassword(formData.confirmPassword, value);
            setValidationErrors(prev => ({
              ...prev,
              confirmPassword: confirmError
            }));
          }
          break;
        case 'confirmPassword':
          error = validateConfirmPassword(value, formData.password);
          break;
        default:
          break;
      }
      
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
    
    // Limpiar error general al escribir
    if (localError) {
      setLocalError(null);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 40) return 'Débil';
    if (passwordStrength <= 80) return 'Media';
    return 'Fuerte';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 40) return 'danger';
    if (passwordStrength <= 80) return 'warning';
    return 'success';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setLocalError(null);
    
    try {
      if (register) {
        await register(formData.name, formData.email, formData.password);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setLocalError('Error: Función de registro no disponible');
      }
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.message?.includes('existe')) {
        setLocalError('Ya existe una cuenta con este correo electrónico');
      } else {
        setLocalError(err.response?.data?.message || 'Error al registrar usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  const displayError = authError || localError;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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

  // Verificar si el formulario es válido para el botón
  const isFormValid = () => {
    return formData.name && 
           formData.email && 
           formData.password && 
           formData.confirmPassword && 
           acceptTerms &&
           !validationErrors.name &&
           !validationErrors.email &&
           !validationErrors.password &&
           !validationErrors.confirmPassword;
  };

  return (
    <Container className="auth-container">
      <Row className="justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Col md={7} lg={6}>
          <div className="text-center mb-4">
            <div className="auth-logo d-inline-block p-3 rounded-circle bg-primary">
              <Lightbulb className="text-white" size={32} />
            </div>
            <h2 className="auth-title mt-3">Crea tu cuenta</h2>
            <p className="auth-subtitle text-muted">Comienza a validar tus hipótesis con Lean Startup Assistant</p>
          </div>
          
          <Card className="shadow border-0 register-card">
            <Card.Body className="p-4 p-md-5">
              {success ? (
                <Alert variant="success" className="d-flex align-items-center mb-4 border-0">
                  <Check2Circle className="me-2" size={24} />
                  <div>
                    <strong>¡Registro exitoso!</strong> Redirigiendo al inicio...
                  </div>
                </Alert>
              ) : (
                <>
                  {displayError && (
                    <Alert variant="danger" className="d-flex align-items-center mb-4 border-0">
                      <ExclamationTriangle className="me-2 flex-shrink-0" size={20} />
                      <div>{displayError}</div>
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-4">
                      <Form.Label>Nombre Completo</Form.Label>
                      <InputGroup className={touched.name && validationErrors.name ? 'has-validation' : ''}>
                        <InputGroup.Text className="bg-light border-end-0">
                          <PersonFill className="text-muted" size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur('name')}
                          placeholder="Ingrese su nombre completo"
                          className={getInputClassName('name')}
                          required
                          isInvalid={touched.name && !!validationErrors.name}
                          isValid={touched.name && !validationErrors.name && !!formData.name}
                        />
                      </InputGroup>
                      {renderFieldError('name')}
                      {renderFieldSuccess('name')}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <InputGroup className={touched.email && validationErrors.email ? 'has-validation' : ''}>
                        <InputGroup.Text className="bg-light border-end-0">
                          <EnvelopeFill className="text-muted" size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur('email')}
                          placeholder="nombre@ejemplo.com"
                          className={getInputClassName('email')}
                          required
                          isInvalid={touched.email && !!validationErrors.email}
                          isValid={touched.email && !validationErrors.email && !!formData.email}
                        />
                      </InputGroup>
                      {renderFieldError('email')}
                      {renderFieldSuccess('email')}
                      {!validationErrors.email && touched.email && (
                        <Form.Text className="text-muted">
                          No compartiremos su correo con nadie más.
                        </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup className={touched.password && validationErrors.password ? 'has-validation' : ''}>
                        <InputGroup.Text className="bg-light border-end-0">
                          <LockFill className="text-muted" size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={() => handleBlur('password')}
                          placeholder="Mínimo 6 caracteres"
                          className={getInputClassName('password') + ' border-end-0'}
                          required
                          isInvalid={touched.password && !!validationErrors.password}
                          isValid={touched.password && !validationErrors.password && !!formData.password}
                        />
                        <InputGroup.Text 
                          className="bg-light border-start-0 cursor-pointer"
                          onClick={togglePasswordVisibility}
                          style={{ cursor: 'pointer' }}
                        >
                          {showPassword ? 
                            <EyeSlashFill className="text-muted" size={16} /> : 
                            <EyeFill className="text-muted" size={16} />
                          }
                        </InputGroup.Text>
                      </InputGroup>
                      {renderFieldError('password')}
                      {renderFieldSuccess('password')}
                      
                      {formData.password && !validationErrors.password && (
                        <div className="mt-2">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="text-muted">Fortaleza:</small>
                            <small className={`text-${getPasswordStrengthColor()}`}>
                              {getPasswordStrengthLabel()}
                            </small>
                          </div>
                          <ProgressBar 
                            now={passwordStrength} 
                            variant={getPasswordStrengthColor()} 
                            style={{ height: '6px' }}
                          />
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <InputGroup className={touched.confirmPassword && validationErrors.confirmPassword ? 'has-validation' : ''}>
                        <InputGroup.Text className="bg-light border-end-0">
                          <LockFill className="text-muted" size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={() => handleBlur('confirmPassword')}
                          placeholder="Vuelva a ingresar su contraseña"
                          className={getInputClassName('confirmPassword') + ' border-end-0'}
                          required
                          isInvalid={touched.confirmPassword && !!validationErrors.confirmPassword}
                          isValid={touched.confirmPassword && !validationErrors.confirmPassword && !!formData.confirmPassword}
                        />
                        <InputGroup.Text 
                          className="bg-light border-start-0 cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ cursor: 'pointer' }}
                        >
                          {showConfirmPassword ? 
                            <EyeSlashFill className="text-muted" size={16} /> : 
                            <EyeFill className="text-muted" size={16} />
                          }
                        </InputGroup.Text>
                      </InputGroup>
                      {renderFieldError('confirmPassword')}
                      {renderFieldSuccess('confirmPassword')}
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check 
                        type="checkbox" 
                        id="termsAgree" 
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        label={
                          <span className="text-muted small">
                            He leído y acepto los <Link to="/terms" className="text-decoration-none">Términos y Condiciones</Link> y la <Link to="/privacy" className="text-decoration-none">Política de Privacidad</Link>
                          </span>
                        }
                        required
                      />
                      {touched.confirmPassword && !acceptTerms && (
                        <Form.Text className="text-danger small">
                          Debe aceptar los términos y condiciones
                        </Form.Text>
                      )}
                    </Form.Group>

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
                            Procesando...
                          </>
                        ) : (
                          <>
                            <PersonPlus className="me-2" size={18} />
                            Crear Cuenta
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="mb-0 text-muted">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="text-decoration-none fw-semibold">
                          Iniciar Sesión
                        </Link>
                      </p>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} Lean Startup Assistant. Todos los derechos reservados.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;