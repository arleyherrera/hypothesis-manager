// src/components/common/SkeletonLoader.js
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './SkeletonLoader.css';

/**
 * Componente base de Skeleton
 */
const SkeletonBase = ({ className = '', style = {} }) => (
  <div className={`skeleton ${className}`} style={style} aria-hidden="true" />
);

/**
 * Skeleton para texto (líneas)
 */
export const SkeletonText = ({ lines = 3, width = '100%' }) => (
  <div className="skeleton-text" style={{ width }}>
    {[...Array(lines)].map((_, i) => (
      <SkeletonBase
        key={i}
        className="skeleton-line"
        style={{
          width: i === lines - 1 ? '70%' : '100%',
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);

/**
 * Skeleton para avatar circular
 */
export const SkeletonAvatar = ({ size = 48 }) => (
  <SkeletonBase
    className="skeleton-avatar"
    style={{ width: size, height: size }}
  />
);

/**
 * Skeleton para imagen/thumbnail
 */
export const SkeletonImage = ({ height = 200 }) => (
  <SkeletonBase
    className="skeleton-image"
    style={{ height }}
  />
);

/**
 * Skeleton para botón
 */
export const SkeletonButton = ({ width = 120 }) => (
  <SkeletonBase
    className="skeleton-button"
    style={{ width }}
  />
);

/**
 * Skeleton para Badge
 */
export const SkeletonBadge = ({ width = 80 }) => (
  <SkeletonBase
    className="skeleton-badge"
    style={{ width }}
  />
);

/**
 * Skeleton para tarjeta de hipótesis
 */
export const HypothesisCardSkeleton = () => (
  <Col>
    <Card className="h-100 skeleton-card">
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <SkeletonBadge width={100} />
          <SkeletonBase className="skeleton-line" style={{ width: 80, height: 14 }} />
        </div>

        <div className="p-3 bg-light rounded mb-3">
          <SkeletonBase className="skeleton-line mb-2" style={{ width: 120, height: 14 }} />
          <SkeletonText lines={2} />
        </div>

        <SkeletonBase className="skeleton-line mb-2" style={{ width: '60%', height: 20 }} />
        <SkeletonText lines={1} />
      </Card.Body>
      <Card.Footer className="bg-white">
        <SkeletonButton width="100%" />
      </Card.Footer>
    </Card>
  </Col>
);

/**
 * Skeleton para lista de hipótesis
 */
export const HypothesisListSkeleton = ({ count = 4 }) => (
  <div className="skeleton-container fade-in">
    {/* Header skeleton */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex align-items-center">
        <SkeletonAvatar size={32} />
        <SkeletonBase className="skeleton-line ms-2" style={{ width: 150, height: 24 }} />
      </div>
      <SkeletonButton width={150} />
    </div>

    {/* Search bar skeleton */}
    <div className="mb-4">
      <SkeletonBase className="skeleton-search" />
    </div>

    {/* Cards grid skeleton */}
    <Row className="row-cols-1 row-cols-md-2 g-4">
      {[...Array(count)].map((_, i) => (
        <HypothesisCardSkeleton key={i} />
      ))}
    </Row>
  </div>
);

/**
 * Skeleton para detalle de hipótesis
 */
export const HypothesisDetailSkeleton = () => (
  <div className="skeleton-container fade-in">
    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex align-items-center">
        <SkeletonAvatar size={28} />
        <SkeletonBase className="skeleton-line ms-2" style={{ width: 200, height: 24 }} />
      </div>
      <div className="d-flex gap-2">
        <SkeletonButton width={100} />
        <SkeletonButton width={120} />
      </div>
    </div>

    {/* Main card */}
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        {/* Problem section */}
        <div className="p-4 bg-light rounded mb-4">
          <div className="d-flex align-items-center mb-3">
            <SkeletonAvatar size={24} />
            <SkeletonBase className="skeleton-line ms-2" style={{ width: 150, height: 20 }} />
          </div>
          <SkeletonText lines={3} />
        </div>

        {/* Title and date */}
        <SkeletonBase className="skeleton-line mb-2" style={{ width: '40%', height: 28 }} />
        <div className="d-flex align-items-center mb-4">
          <SkeletonBase className="skeleton-line" style={{ width: 150, height: 14 }} />
          <SkeletonBadge className="ms-3" />
        </div>

        {/* Fields */}
        <Row className="mb-3">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <SkeletonBase className="skeleton-line mb-3" style={{ width: 100, height: 18 }} />
                <SkeletonText lines={3} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <SkeletonBase className="skeleton-line mb-3" style={{ width: 140, height: 18 }} />
                <SkeletonText lines={2} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <SkeletonBase className="skeleton-line mb-3" style={{ width: 130, height: 18 }} />
                <SkeletonText lines={2} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </div>
);

/**
 * Skeleton para tarjeta de artefacto
 */
export const ArtifactCardSkeleton = () => (
  <Col>
    <Card className="h-100 shadow-sm border-0 skeleton-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <SkeletonBadge width={80} />
          <SkeletonAvatar size={24} />
        </div>
        <SkeletonBase className="skeleton-line mb-3" style={{ width: '80%', height: 20 }} />
        <SkeletonText lines={2} />
      </Card.Body>
      <Card.Footer className="bg-white border-top-0 pt-0">
        <SkeletonButton width="100%" />
      </Card.Footer>
    </Card>
  </Col>
);

/**
 * Skeleton para lista de artefactos
 */
export const ArtifactListSkeleton = ({ count = 3 }) => (
  <div className="skeleton-container">
    {/* Phase header */}
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div className="d-flex align-items-center">
        <SkeletonAvatar size={44} />
        <div className="ms-3">
          <SkeletonBase className="skeleton-line mb-2" style={{ width: 100, height: 20 }} />
          <SkeletonBase className="skeleton-line" style={{ width: 250, height: 14 }} />
        </div>
      </div>
      <SkeletonButton width={160} />
    </div>

    {/* Artifact cards */}
    <Row className="row-cols-1 row-cols-md-2 g-4 mt-3">
      {[...Array(count)].map((_, i) => (
        <ArtifactCardSkeleton key={i} />
      ))}
    </Row>
  </div>
);

/**
 * Skeleton para perfil de usuario
 */
export const ProfileSkeleton = () => (
  <div className="skeleton-container">
    <SkeletonButton width={100} className="mb-3" />

    <Card className="shadow-sm">
      <Card.Header className="bg-primary" style={{ height: 60 }}>
        <div className="d-flex align-items-center">
          <SkeletonAvatar size={24} />
          <SkeletonBase className="skeleton-line ms-2" style={{ width: 120, height: 20, background: 'rgba(255,255,255,0.3)' }} />
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        {/* Form fields */}
        {[1, 2].map((_, i) => (
          <div className="mb-4" key={i}>
            <SkeletonBase className="skeleton-line mb-2" style={{ width: 120, height: 14 }} />
            <SkeletonBase className="skeleton-input" />
          </div>
        ))}

        <hr className="my-4" />

        <SkeletonBase className="skeleton-line mb-4" style={{ width: 150, height: 20 }} />

        <SkeletonButton width="100%" />
      </Card.Body>
    </Card>
  </div>
);

/**
 * Skeleton genérico con pulso
 */
const SkeletonLoader = ({
  type = 'text',
  count = 1,
  ...props
}) => {
  const skeletonTypes = {
    text: () => <SkeletonText {...props} />,
    avatar: () => <SkeletonAvatar {...props} />,
    image: () => <SkeletonImage {...props} />,
    button: () => <SkeletonButton {...props} />,
    badge: () => <SkeletonBadge {...props} />,
    hypothesisList: () => <HypothesisListSkeleton count={count} />,
    hypothesisDetail: () => <HypothesisDetailSkeleton />,
    artifactList: () => <ArtifactListSkeleton count={count} />,
    profile: () => <ProfileSkeleton />
  };

  const SkeletonComponent = skeletonTypes[type] || skeletonTypes.text;

  return <SkeletonComponent />;
};

export default SkeletonLoader;
