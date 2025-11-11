import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldLockFill, CheckCircleFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validar requisitos de contraseña
  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*]/.test(formData.password),
    noSpaces: !/\s/.test(formData.password)
  };

  const allRequirementsMet = Object.values(passwordRequirements).every(req => req);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  // Calcular fuerza de contraseña
  const passwordStrength = Object.values(passwordRequirements).filter(req => req).length;
  const strengthPercentage = (passwordStrength / 6) * 100;
  const strengthVariant = strengthPercentage < 50 ? 'danger' : strengthPercentage < 80 ? 'warning' : 'success';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validar formulario
    if (form.checkValidity() === false || !allRequirementsMet || !passwordsMatch) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError('');
    setLoading(true);

    try {
      await resetPassword(token, formData.password);
      setSuccess(true);

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.' }
        });
      }, 3000);
    } catch (err) {
      console.error('Error al resetear contraseña:', err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Error al restablecer la contraseña. El enlace puede haber expirado.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="mb-3">
                  <ShieldLockFill size={48} className="text-primary" />
                </div>
                <h2 className="fw-bold mb-2">Restablecer Contraseña</h2>
                <p className="text-muted mb-0">
                  Crea una nueva contraseña segura para tu cuenta.
                </p>
              </div>

              {/* Mensaje de éxito */}
              {success ? (
                <div className="text-center py-4">
                  <CheckCircleFill size={64} className="text-success mb-3" />
                  <Alert variant="success">
                    <Alert.Heading>¡Contraseña actualizada!</Alert.Heading>
                    <p className="mb-0">
                      Tu contraseña ha sido actualizada exitosamente.
                    </p>
                    <hr />
                    <p className="mb-0">
                      Serás redirigido al inicio de sesión en unos segundos...
                    </p>
                  </Alert>
                  <Spinner animation="border" variant="primary" className="mt-3" />
                </div>
              ) : (
                <>
                  {/* Mensaje de error */}
                  {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                      <strong>Error:</strong> {error}
                    </Alert>
                  )}

                  {/* Alerta de expiración de token */}
                  {error.includes('expirado') && (
                    <Alert variant="info" className="mt-3">
                      <Link to="/forgot-password" className="alert-link">
                        Solicita un nuevo enlace de reseteo aquí
                      </Link>
                    </Alert>
                  )}

                  {/* Formulario */}
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* Nueva Contraseña */}
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label className="fw-semibold">
                        Nueva Contraseña
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          size="lg"
                          isInvalid={validated && !allRequirementsMet}
                          isValid={validated && allRequirementsMet}
                        />
                        <Button
                          variant="link"
                          className="position-absolute top-50 end-0 translate-middle-y"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                          style={{ zIndex: 10 }}
                        >
                          {showPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                      </div>

                      {/* Barra de fuerza de contraseña */}
                      {formData.password && (
                        <div className="mt-2">
                          <ProgressBar
                            now={strengthPercentage}
                            variant={strengthVariant}
                            style={{ height: '5px' }}
                          />
                          <small className={`text-${strengthVariant}`}>
                            Fuerza: {strengthPercentage < 50 ? 'Débil' : strengthPercentage < 80 ? 'Media' : 'Fuerte'}
                          </small>
                        </div>
                      )}
                    </Form.Group>

                    {/* Requisitos de contraseña */}
                    <div className="mb-3 p-3 bg-light rounded">
                      <small className="fw-semibold d-block mb-2">La contraseña debe contener:</small>
                      <ul className="list-unstyled mb-0 small">
                        <li className={passwordRequirements.minLength ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.minLength ? '✓' : '○'} Al menos 8 caracteres
                        </li>
                        <li className={passwordRequirements.hasUpperCase ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.hasUpperCase ? '✓' : '○'} Una letra mayúscula
                        </li>
                        <li className={passwordRequirements.hasLowerCase ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.hasLowerCase ? '✓' : '○'} Una letra minúscula
                        </li>
                        <li className={passwordRequirements.hasNumber ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.hasNumber ? '✓' : '○'} Un número
                        </li>
                        <li className={passwordRequirements.hasSpecialChar ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.hasSpecialChar ? '✓' : '○'} Un carácter especial (!@#$%^&*)
                        </li>
                        <li className={passwordRequirements.noSpaces ? 'text-success' : 'text-muted'}>
                          {passwordRequirements.noSpaces ? '✓' : '○'} Sin espacios
                        </li>
                      </ul>
                    </div>

                    {/* Confirmar Contraseña */}
                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <Form.Label className="fw-semibold">
                        Confirmar Contraseña
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          size="lg"
                          isInvalid={validated && formData.confirmPassword && !passwordsMatch}
                          isValid={validated && passwordsMatch}
                        />
                        <Button
                          variant="link"
                          className="position-absolute top-50 end-0 translate-middle-y"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          tabIndex={-1}
                          style={{ zIndex: 10 }}
                        >
                          {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        Las contraseñas no coinciden.
                      </Form.Control.Feedback>
                      {passwordsMatch && (
                        <Form.Text className="text-success">
                          ✓ Las contraseñas coinciden
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Botón de envío */}
                    <div className="d-grid gap-2 mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading || !allRequirementsMet || !passwordsMatch}
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Actualizando...
                          </>
                        ) : (
                          <>
                            <ShieldLockFill className="me-2" />
                            Restablecer Contraseña
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Link para recordar contraseña */}
                    <div className="text-center">
                      <Link to="/login" className="text-decoration-none">
                        ¿Recordaste tu contraseña? Inicia sesión
                      </Link>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Información de seguridad */}
          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              <ShieldLockFill className="me-1" />
              Tu contraseña será almacenada de forma segura y encriptada.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
