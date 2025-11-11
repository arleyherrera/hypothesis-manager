// src/components/common/ErrorBoundary.js
import React from 'react';
import { Alert, Button, Container, Card } from 'react-bootstrap';
import { ExclamationTriangleFill, ArrowClockwise, HouseFill } from 'react-bootstrap-icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Actualizar el estado para mostrar la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Registrar el error en la consola
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);

    // Guardar información del error en el estado
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Aquí podrías enviar el error a un servicio de logging externo
    // Por ejemplo: Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo);
  }

  handleReload = () => {
    // Recargar la página
    window.location.reload();
  };

  handleGoHome = () => {
    // Resetear el estado y navegar al inicio
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <Card className="shadow-lg border-0" style={{ maxWidth: '600px', width: '100%' }}>
            <Card.Body className="p-5">
              {/* Icono de error */}
              <div className="text-center mb-4">
                <ExclamationTriangleFill
                  size={64}
                  className="text-danger mb-3"
                />
                <h2 className="fw-bold text-danger mb-2">¡Algo salió mal!</h2>
                <p className="text-muted">
                  Lo sentimos, ha ocurrido un error inesperado en la aplicación.
                </p>
              </div>

              {/* Mensaje del error (solo en desarrollo) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Alert variant="danger" className="mb-4">
                  <Alert.Heading className="h6">Detalles del error (solo en desarrollo):</Alert.Heading>
                  <pre className="mb-2 small" style={{
                    maxHeight: '150px',
                    overflow: 'auto',
                    backgroundColor: '#f8f9fa',
                    padding: '10px',
                    borderRadius: '4px'
                  }}>
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <details className="small">
                      <summary style={{ cursor: 'pointer' }}>Stack trace</summary>
                      <pre style={{
                        maxHeight: '200px',
                        overflow: 'auto',
                        backgroundColor: '#f8f9fa',
                        padding: '10px',
                        borderRadius: '4px',
                        marginTop: '10px'
                      }}>
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </Alert>
              )}

              {/* Sugerencias para el usuario */}
              <Card className="bg-light border-0 mb-4">
                <Card.Body>
                  <h6 className="fw-semibold mb-3">Qué puedes hacer:</h6>
                  <ul className="mb-0 ps-3">
                    <li className="mb-2">Recarga la página para intentar de nuevo</li>
                    <li className="mb-2">Vuelve a la página de inicio</li>
                    <li className="mb-2">Si el problema persiste, contacta al soporte</li>
                  </ul>
                </Card.Body>
              </Card>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={this.handleReload}
                  className="d-flex align-items-center justify-content-center"
                >
                  <ArrowClockwise className="me-2" size={20} />
                  Recargar página
                </Button>

                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={this.handleGoHome}
                  className="d-flex align-items-center justify-content-center"
                >
                  <HouseFill className="me-2" size={18} />
                  Ir al inicio
                </Button>
              </div>

              {/* Información adicional */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  Este error ha sido registrado y nuestro equipo será notificado.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
