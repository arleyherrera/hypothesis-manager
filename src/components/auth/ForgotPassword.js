import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EnvelopeFill, ArrowLeft, CheckCircleFill } from 'react-bootstrap-icons';
import { forgotPassword } from '../../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validar formulario
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      setEmail(''); // Limpiar formulario
    } catch (err) {
      console.error('Error al solicitar reseteo:', err);
      setError(
        err.response?.data?.message ||
        'Error al enviar el correo. Por favor, inténtalo de nuevo.'
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
                  <EnvelopeFill size={48} className="text-primary" />
                </div>
                <h2 className="fw-bold mb-2">¿Olvidaste tu contraseña?</h2>
                <p className="text-muted mb-0">
                  No te preocupes, te enviaremos instrucciones para restablecerla.
                </p>
              </div>

              {/* Mensaje de éxito */}
              {success ? (
                <div className="text-center py-4">
                  <CheckCircleFill size={64} className="text-success mb-3" />
                  <Alert variant="success" className="mb-4">
                    <Alert.Heading>¡Correo enviado!</Alert.Heading>
                    <p className="mb-0">
                      Si el correo existe en nuestro sistema, recibirás un email con
                      instrucciones para restablecer tu contraseña.
                    </p>
                    <hr />
                    <p className="mb-0 small">
                      <strong>Nota:</strong> El enlace expirará en 1 hora por seguridad.
                      Si no recibes el correo, revisa tu carpeta de spam.
                    </p>
                  </Alert>

                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      as={Link}
                      to="/login"
                      size="lg"
                    >
                      <ArrowLeft className="me-2" />
                      Volver al inicio de sesión
                    </Button>

                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setSuccess(false);
                        setValidated(false);
                      }}
                    >
                      Enviar otro correo
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Mensaje de error */}
                  {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')}>
                      {error}
                    </Alert>
                  )}

                  {/* Formulario */}
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="email">
                      <Form.Label className="fw-semibold">
                        Correo Electrónico
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        size="lg"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa un correo electrónico válido.
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Ingresa el correo asociado a tu cuenta.
                      </Form.Text>
                    </Form.Group>

                    {/* Botón de envío */}
                    <div className="d-grid gap-2 mb-3">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
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
                            Enviando...
                          </>
                        ) : (
                          <>
                            <EnvelopeFill className="me-2" />
                            Enviar instrucciones
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Link para volver */}
                    <div className="text-center">
                      <Link
                        to="/login"
                        className="text-decoration-none d-inline-flex align-items-center"
                      >
                        <ArrowLeft className="me-1" />
                        Volver al inicio de sesión
                      </Link>
                    </div>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              ¿Necesitas ayuda? Contacta al soporte.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
