import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { fetchHypotheses } from '../../services/hypothesisService';
import { formatDate } from '../../utils/dateFormat';
import { useDebounce } from '../../hooks/useDebounce';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState';
import { useToast } from '../common/SuccessAnimation';
import {
  Lightbulb,
  Calendar3,
  ArrowRightCircle,
  ExclamationTriangle,
  PlusCircle,
  Search,
  PatchQuestion
} from 'react-bootstrap-icons';

// Componente memorizado para cada tarjeta con accesibilidad mejorada
const HypothesisCard = React.memo(({ hypothesis }) => {
  const TEXT_TRUNCATE_LIMITS = {
    PROBLEM: 150,
    SEGMENT: 80
  };

  const truncateText = useCallback((text, limit) => {
    if (!text) return 'No disponible';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }, []);

  const hasArtifacts = useMemo(() =>
    hypothesis.artifacts && hypothesis.artifacts.length > 0,
    [hypothesis.artifacts]
  );

  const artifactCount = hypothesis.artifacts?.length || 0;

  return (
    <Col>
      <Card
        className="h-100 hypothesis-card hover-lift"
        role="article"
        aria-labelledby={`hypothesis-title-${hypothesis.id}`}
      >
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <Badge
              bg={hasArtifacts ? "success" : "secondary"}
              className="px-3 py-2"
              aria-label={hasArtifacts ? `${artifactCount} artefactos asociados` : 'Sin artefactos asociados'}
            >
              {hasArtifacts ? `${artifactCount} artefacto${artifactCount > 1 ? 's' : ''}` : 'Sin artefactos'}
            </Badge>
            <small className="text-muted d-flex align-items-center">
              <Calendar3 className="me-1" size={14} aria-hidden="true" />
              <time dateTime={hypothesis.createdAt}>
                {formatDate(hypothesis.createdAt)}
              </time>
            </small>
          </div>

          <div className="problem-section mb-3 p-3 bg-light rounded">
            <h6 className="text-primary mb-2 d-flex align-items-center">
              <PatchQuestion className="me-2" size={18} aria-hidden="true" />
              Problema Identificado
            </h6>
            <p className="mb-0 text-dark">
              {truncateText(hypothesis.problem, TEXT_TRUNCATE_LIMITS.PROBLEM)}
            </p>
          </div>

          <h5
            id={`hypothesis-title-${hypothesis.id}`}
            className="card-title text-secondary mb-2"
          >
            {hypothesis.name}
          </h5>

          <p className="text-muted small mb-0">
            <strong>Segmento:</strong> {truncateText(hypothesis.customerSegment, TEXT_TRUNCATE_LIMITS.SEGMENT)}
          </p>
        </Card.Body>
        <Card.Footer className="bg-white">
          <Link
            to={`/hypothesis/${hypothesis.id}`}
            className="w-100"
            aria-label={`Ver detalles de la hipotesis: ${hypothesis.name}`}
          >
            <Button
              variant="outline-primary"
              className="w-100 d-flex justify-content-center align-items-center btn-hover-fill"
              tabIndex={-1}
            >
              Ver Detalles
              <ArrowRightCircle className="ms-2" size={16} aria-hidden="true" />
            </Button>
          </Link>
        </Card.Footer>
      </Card>
    </Col>
  );
});

HypothesisCard.displayName = 'HypothesisCard';

const HypothesisList = () => {
  const [hypotheses, setHypotheses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Sistema de toasts para notificaciones
  const { showToast, ToastsContainer } = useToast();

  // Usar debounce para la busqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Usar useCallback para evitar recrear la funcion
  const loadHypotheses = useCallback(async () => {
    try {
      const data = await fetchHypotheses();
      setHypotheses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error al cargar hipotesis:", err);
      setError('Error al cargar las hipotesis. Por favor, intentelo de nuevo.');
      setHypotheses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHypotheses();
  }, [loadHypotheses]);

  // Mostrar mensaje de exito si viene del state
  useEffect(() => {
    if (location.state?.message) {
      showToast({
        message: location.state.message,
        type: 'success',
        position: 'top-right',
        duration: 4000
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state, showToast]);

  // Memorizar el filtrado para evitar recálculos
  const filteredHypotheses = useMemo(() => {
    if (!debouncedSearchTerm) return hypotheses;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return hypotheses.filter(hypothesis => {
      if (!hypothesis) return false;
      const nameMatch = hypothesis.name && hypothesis.name.toLowerCase().includes(searchLower);
      const problemMatch = hypothesis.problem && hypothesis.problem.toLowerCase().includes(searchLower);
      return nameMatch || problemMatch;
    });
  }, [hypotheses, debouncedSearchTerm]);

  // Manejar cambio de búsqueda con debounce
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Renderizar estado de carga con SkeletonLoader
  const renderLoading = () => (
    <div className="fade-in">
      {renderHeader()}
      <SkeletonLoader type="hypothesisList" count={4} />
    </div>
  );

  const renderError = () => (
    <Alert variant="danger" className="d-flex align-items-start p-4 my-4">
      <ExclamationTriangle className="me-3 mt-1" size={24} />
      <div>
        <Alert.Heading>Ha ocurrido un error</Alert.Heading>
        <p>{error}</p>
        <div className="mt-3">
          <Button onClick={() => window.location.reload()} variant="outline-danger">
            Reintentar
          </Button>
        </div>
      </div>
    </Alert>
  );

  const renderHeader = () => (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-0 h2">
        <span className="d-flex align-items-center">
          <Lightbulb className="me-2 text-primary" size={32} aria-hidden="true" />
          Mis Hipotesis
        </span>
      </h1>
      <Link to="/create" aria-label="Crear nueva hipotesis">
        <Button
          variant="success"
          className="d-flex align-items-center btn-hover-scale"
        >
          <PlusCircle className="me-2" size={18} aria-hidden="true" />
          Nueva Hipotesis
        </Button>
      </Link>
    </header>
  );

  const renderSearchBar = () => (
    <div className="mb-4 position-relative" role="search">
      <label htmlFor="search-hypotheses" className="visually-hidden">
        Buscar hipotesis
      </label>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0" aria-hidden="true">
          <Search size={18} />
        </span>
        <input
          id="search-hypotheses"
          type="search"
          className="form-control border-start-0"
          placeholder="Buscar por problema o nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-describedby="search-results-count"
        />
      </div>
      {debouncedSearchTerm && (
        <div id="search-results-count" className="visually-hidden" aria-live="polite">
          {filteredHypotheses.length} resultados encontrados
        </div>
      )}
    </div>
  );

  // Estado vacio con ilustracion animada
  const renderEmptyState = () => (
    <EmptyState
      type="hypothesis"
      title="No hay hipotesis registradas"
      description="Comience creando su primera hipotesis de negocio para validarla con la metodologia Lean Startup."
      actionText="Crear mi primera hipotesis"
      actionLink="/create"
      icon={<PlusCircle size={20} />}
    />
  );

  // Sin resultados de busqueda
  const renderNoResults = () => (
    <Col xs={12}>
      <EmptyState
        type="search"
        title="Sin resultados"
        description={`No se encontraron hipotesis con el termino "${searchTerm}".`}
        actionText="Limpiar busqueda"
        onAction={() => setSearchTerm('')}
        icon={<Search size={20} />}
      />
    </Col>
  );

  const renderHypothesesGrid = () => (
    <Row className="row-cols-1 row-cols-md-2 g-4 mb-4">
      {filteredHypotheses.length > 0 
        ? filteredHypotheses.map(hypothesis => (
            <HypothesisCard key={hypothesis.id} hypothesis={hypothesis} />
          ))
        : renderNoResults()
      }
    </Row>
  );

  const renderContent = () => (
    <div className="fade-in">
      {renderHeader()}
      {hypotheses.length > 0 && renderSearchBar()}
      {hypotheses.length === 0 ? renderEmptyState() : renderHypothesesGrid()}
      <ToastsContainer />
    </div>
  );

  if (loading) return renderLoading();
  if (error) return (
    <>
      {renderError()}
      <ToastsContainer />
    </>
  );
  return renderContent();
};

export default HypothesisList;