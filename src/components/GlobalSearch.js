import React, { useEffect, useRef } from 'react';
import { Modal, ListGroup, Badge } from 'react-bootstrap';
import { 
  Search, 
  Lightbulb, 
  FileText, 
  PlusCircle, 
  List,
  House
} from 'react-bootstrap-icons';

const GlobalSearchModal = ({ 
  isOpen, 
  onClose, 
  query, 
  onQueryChange, 
  results, 
  selectedIndex, 
  onSelectedIndexChange,
  onExecuteAction
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onSelectedIndexChange(Math.min(selectedIndex + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onSelectedIndexChange(Math.max(selectedIndex - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onExecuteAction(selectedIndex);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      'lightbulb': <Lightbulb size={18} />,
      'file-text': <FileText size={18} />,
      'plus-circle': <PlusCircle size={18} />,
      'list': <List size={18} />,
      'house': <House size={18} />
    };
    return icons[iconName] || <Search size={18} />;
  };

  const getTypeColor = (type) => {
    const colors = {
      'hypothesis': 'primary',
      'artifact': 'success',
      'navigation': 'secondary'
    };
    return colors[type] || 'light';
  };

  const getTypeLabel = (type) => {
    const labels = {
      'hypothesis': 'Hipótesis',
      'artifact': 'Artefacto',
      'navigation': 'Navegación'
    };
    return labels[type] || type;
  };

  return (
    <Modal 
      show={isOpen} 
      onHide={onClose} 
      size="lg" 
      centered
      className="global-search-modal"
      backdrop="static"
    >
      <Modal.Body className="p-0">
        <div className="search-input-container p-3 border-bottom">
          <div className="position-relative">
            <Search 
              className="position-absolute top-50 start-0 translate-middle-y ms-3" 
              size={20} 
              style={{ color: '#6c757d' }}
            />
            <input
              ref={inputRef}
              type="text"
              className="form-control form-control-lg ps-5"
              placeholder="Buscar hipótesis, artefactos o navegar... (Ctrl+K)"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ 
                border: 'none', 
                fontSize: '1.1rem',
                boxShadow: 'none'
              }}
            />
          </div>
        </div>

        {results.length > 0 && (
          <ListGroup variant="flush" className="search-results">
            {results.map((result, index) => (
              <ListGroup.Item
                key={`${result.type}-${result.id || result.title}`}
                action
                active={index === selectedIndex}
                onClick={() => onExecuteAction(index)}
                className="d-flex align-items-center px-3 py-3 search-result-item"
                style={{ 
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                <div className="me-3 text-muted d-flex align-items-center justify-content-center" 
                     style={{ width: '24px', height: '24px' }}>
                  {getIcon(result.icon)}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <h6 className="mb-0 me-2 fw-semibold" style={{ fontSize: '0.95rem' }}>
                      {result.title}
                    </h6>
                    <Badge bg={getTypeColor(result.type)} className="fs-6" style={{ fontSize: '0.7rem' }}>
                      {getTypeLabel(result.type)}
                    </Badge>
                  </div>
                  {result.subtitle && (
                    <small className="text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.3' }}>
                      {result.subtitle}
                    </small>
                  )}
                </div>
                {index === selectedIndex && (
                  <div className="text-muted ms-2">
                    <small>↵</small>
                  </div>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-5">
            <Search size={48} className="text-muted mb-3" style={{ opacity: 0.4 }} />
            <h5 className="text-muted mb-2">No se encontraron resultados</h5>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}

        {!query && (
          <div className="text-center py-4" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="mb-3">
              <small className="text-muted d-block mb-2">Navegación por teclado:</small>
              <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                <span className="d-flex align-items-center">
                  <kbd className="me-1">↑</kbd>
                  <kbd className="me-2">↓</kbd> 
                  <small className="text-muted">navegar</small>
                </span>
                <span className="d-flex align-items-center">
                  <kbd className="me-2">Enter</kbd> 
                  <small className="text-muted">seleccionar</small>
                </span>
                <span className="d-flex align-items-center">
                  <kbd className="me-2">Esc</kbd> 
                  <small className="text-muted">cerrar</small>
                </span>
              </div>
            </div>
            <small className="text-muted">
              Busca hipótesis, artefactos o usa comandos de navegación
            </small>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GlobalSearchModal;