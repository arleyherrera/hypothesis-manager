import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { 
  Calendar3, 
  FileText, 
  Eye,
  Hammer,
  BarChart,
  Lightbulb,
  ArrowRepeat,
  Shuffle
} from 'react-bootstrap-icons';
import { formatDate } from '../utils/dateFormat';

const ArtifactPreviewCard = ({ artifact, position, isVisible }) => {
  if (!artifact) return null;

  const getPhaseColor = (phase) => {
    const colors = {
      'build': 'primary',
      'measure': 'success', 
      'learn': 'info',
      'pivot': 'warning',
      'iterate': 'danger'
    };
    return colors[phase?.toLowerCase()] || 'secondary';
  };

  const getPhaseIcon = (phase) => {
    const icons = {
      'build': <Hammer size={12} />,
      'measure': <BarChart size={12} />,
      'learn': <Lightbulb size={12} />,
      'pivot': <Shuffle size={12} />,
      'iterate': <ArrowRepeat size={12} />
    };
    return icons[phase?.toLowerCase()] || <FileText size={12} />;
  };

  const truncateContent = (content, maxLength = 160) => {
    if (!content) return 'Sin contenido disponible';
    
    // Remover markdown básico
    const plainText = content
      .replace(/[#*`]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
    
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };

  const getCreationDate = () => {
    const date = artifact.updatedAt || artifact.createdAt || new Date();
    return formatDate(date);
  };

  return (
    <div
      className={`artifact-preview-card ${isVisible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1060,
        width: '350px',
        maxWidth: '90vw',
        pointerEvents: 'none'
      }}
    >
      <Card className="shadow-lg border-0 preview-card">
        <Card.Header className="bg-white border-0 pb-2">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <h6 className="mb-2 fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                {artifact.title || 'Artefacto sin título'}
              </h6>
              <Badge 
                bg={getPhaseColor(artifact.phase)} 
                className="text-white d-flex align-items-center w-fit"
                style={{ width: 'fit-content' }}
              >
                {getPhaseIcon(artifact.phase)}
                <span className="ms-1 text-capitalize">
                  {artifact.phase || 'Sin fase'}
                </span>
              </Badge>
            </div>
          </div>
        </Card.Header>
        
        <Card.Body className="pt-1 pb-3">
          <div className="preview-content mb-3">
            <p className="text-muted small mb-0" style={{ 
              lineHeight: '1.5',
              fontSize: '0.85rem',
              textAlign: 'justify'
            }}>
              {truncateContent(artifact.content)}
            </p>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center text-muted">
              <Calendar3 size={12} className="me-1" />
              <small style={{ fontSize: '0.75rem' }}>
                {getCreationDate()}
              </small>
            </div>
            <div className="d-flex align-items-center text-primary">
              <Eye size={12} className="me-1" />
              <small style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                Click para abrir
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ArtifactPreviewCard;